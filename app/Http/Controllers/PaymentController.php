<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PaymentController extends Controller
{
    public function index()
    {
        $user = User::find(Auth::user()->id);
        $userCart = $user->userCart->cartItems;
        $totalPrice = 0;
        $address = $user->address;
        $shopingCart = [];
        
        foreach ($userCart as $cartItem) {
            $product = Product::find($cartItem->product_id);
            $totalPrice += $product->price;
            array_push($shopingCart, $product);
        }
        
        return Inertia::render('Payment/Payment', [
            'totalPrice' => $totalPrice,
            'delivering_address' => $address,
            'shopingCart' => $shopingCart,
        ]);
    }

    public function checkout()
    {
        $user = User::find(Auth::user()->id);
        $totalPrice = 0;
        $userCart = $user->userCart->cartItems;
        $lineItems = [];
        $shopingCart = [];
        
        foreach ($userCart as $cartItem) {
            $product = Product::find($cartItem->product_id);
            if ($product->promotion_id) {
                $appliedPromotion = Promotion::find($product->promotion_id);
                $currentDate = Carbon::today();
                $isInRange = isDateInRange($currentDate, $appliedPromotion->start_date, $appliedPromotion->end_date);
                if ($isInRange) {
                    $productPrice = ($product->price * (100 - $appliedPromotion->dicount_rate)) / 100;
                } else {
                    $productPrice = $product->price;
                }
            } else {
                $productPrice = $product->price;
            }
            $totalPrice += $productPrice;
            array_push($shopingCart, $product);
            array_push($lineItems, [
                'price_data' => [
                    'currency' => 'USD',
                    'product_data' => [
                        'name' => $product->name
                    ],
                    'unit_amount' => $productPrice * 100,
                ],
                'quantity' => $cartItem->quantity,
            ]);
        }
        
        Stripe::setApiKey(env('STRIPE_SK'));
        
        $session = Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route(name: 'payment.success', absolute: true) . "?session_id={CHECKOUT_SESSION_ID}",
            'cancel_url' => route(name: 'payment.cancel', absolute: true),
        ]);
        
        $order = new Order();
        $order->user_id = Auth::user()->id;
        $order->order_date = now();
        $order->delivering_address = $user->address;
        $order->total_order = $totalPrice;
        $order->session_id = $session->id;
        $order->order_status = 'unpaid';
        $order->Items_details = json_encode([ "Items_details" => $shopingCart]);
        $order->save();
        
        return response('', 409)
            ->header('X-Inertia-Location', $session->url);
    }

    public function success(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SK'));
        $sessionId = $request->get(key:'session_id');
        
        $session = Session::retrieve($sessionId);
        if (!$session) {
            throw new NotFoundHttpException();
        }
        
        $order = Order::where('session_id', $session->id)->where('order_status', 'unpaid')->first();
        if (!$order) {
            throw new NotFoundHttpException();
        }
        // diminuer le stock
        $itemsOrdered = json_decode($order->Items_details)->Items_details;
        foreach ($itemsOrdered as  $item) {
            $product = Product::find($item->id);
            $product->quantity -= 1;
            $product->save();
        }
        //Vider le cart
        $ItemsInCart = Auth::user()->userCart->cartItems;
        foreach ($ItemsInCart as $ItemInCart) {
            $ItemInCart->delete();
        }
        // mettre ajour le statue du paiement
        $order->order_status = 'paid';
        $order->save();
        
        return Inertia::render('Payment/PaymentSuccess');
    }

    public function testSuccess()
    {
        return Inertia::render('Payment/PaymentSuccess');
    }

    public function cancel()
    {
        return Inertia::render('Payment/PaymentCancel');
    }
}
