<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    // Normal pages
    public static function welcome() 
    {
        return Inertia::render('Index');
    }

    public function Apropos()
    {
        return Inertia::render('Apropos');
    }

    public function blog()
    {
        return Inertia::render('Blog');
    }

    public function ccpArticle()
    {
        return Inertia::render('Articles/Ccp');
    }

    public function cepArticle()
    {
        return Inertia::render('Articles/Cep');
    }

    public static function boutique()
    {
        $products = Product::all();
        $promotions = Promotion::all();
        
        return Inertia::render('Boutique', [
            'products' => $products,
            'promotions' => $promotions
        ]);
    }

    public function myOrders()
    {
        $orders = Order::where('user_id', Auth::user()->id)->get();
        return Inertia::render('UserOrders', [
            "orders" => $orders,
        ]);
    }

    // Cart CRUD
    public static function cart()
    {
        $userCart =  User::find(Auth::user()->id)->userCart->cartItems;
        $shoppingCart = [];
        foreach ($userCart as $itemCart) {
            $product = Product::find($itemCart->product_id);
            array_push($shoppingCart, $product);
        }
        return Inertia::render('Cart', [
            'shoppingCart' => $shoppingCart,
        ]);
    }

    function addInCart(Product $productId)
    {
        if (Auth::user()) {
            $cartItem = new CartItem();
            $cartItem->user_cart_id = User::find(Auth::user()->id)->userCart->id;
            $cartItem->product_id = $productId->id;
            $cartItem->quantity = 1;
            $cartItem->save();
        } else {
            return redirect()->route("login");
        }
    }

    function removeProduct(Product $productId)
    {
        $cartItem = CartItem::where("product_id", $productId->id)->first();
        $cartItem->delete();
    }

    // Dashboard
    public static function allProducts()
    {
        $products = Product::all();
        return Inertia::render('Dashboard/AllProduct', [
            'products' => $products
        ]);
    }

    public static function promotion()
    {
        $promotions = Promotion::all();
        return Inertia::render('Dashboard/Promotion', [
            'promotions' => $promotions
        ]);
    }

    public static function creatPromotion(Request $request)
    {
        function discountAllProducts() {
            $promotions =  Promotion::all();
            $promotionsNumber =  count($promotions) - 1;
            $promotion = $promotions[$promotionsNumber];
            $products = Product::all();
            foreach ($products as $product) {
                $product->promotion_id = $promotion->id;
                $product->save();
            }
        }
        
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'dicount_rate' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);
        
        $promotion = new Promotion();
        $promotion->name = $request->name;
        $promotion->description = $request->description;
        $promotion->dicount_rate = $request->dicount_rate;
        $promotion->start_date = $request->start_date;
        $promotion->end_date = $request->end_date;
        $promotion->save();
        
        if ($request->applyToAllProducts) {
            discountAllProducts();
        }
        
        return redirect()->route("promotion");
    }

    public function editPromotion(Promotion $promotion)
    {
        return Inertia::render('Dashboard/EditPromotion', [
            'promotion' => $promotion,
        ]);
    }

    public function updatePromotion(Request $request)
    {
        $request->validate([
            'name' => 'required|min:2',
            'description' => 'required|min:10|max:100',
            'dicount_rate' => 'required|Integer',
            'start_date' => 'required',
            'end_date' => 'required',
            'promotionId' => 'required',
        ]);
        
        $promotionId = $request->promotionId ;
        $thePromotion = Promotion::find($promotionId);
        
        // dd($promotionId, $thePromotion, $request);
        
        while ($thePromotion !== null):
            $udates = array(
                'name' => $request->name,
                'description' => $request->description,
                'dicount_rate' => $request->dicount_rate,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            );
            $udatesObj = (object) $udates;
            
            $currentInfo = array(
                'name' => $thePromotion->name,
                'description' => $thePromotion->description,
                'dicount_rate' => $thePromotion->dicount_rate,
                'start_date' => $thePromotion->start_date,
                'end_date' => $thePromotion->end_date,
            );
            $currentInfoObj2 = (object) $currentInfo;
            if (isUpdatePromotionNecessary($udatesObj, $currentInfoObj2)) {
                $thePromotion->name = $request->name;
                $thePromotion->description = $request->description;
                $thePromotion->dicount_rate = $request->dicount_rate;
                $thePromotion->start_date = $request->start_date;
                $thePromotion->end_date = $request->end_date;
                
                $thePromotion->save();
                return redirect()->route("promotion");
            } else {
                return redirect()->route("promotion");
            }
        endwhile;
    }

    public static function destroyPromotion(Promotion $promotion)
    {
        $productsDiscounted = Product::where('promotion_id', $promotion->id)->get();
        if (count($productsDiscounted) > 0) {
            foreach ($productsDiscounted as $productDiscounted) {
                $productDiscounted->promotion_id = null;
                $productDiscounted->save();
            }
            $promotions = Promotion::all();
            $thePromotion = $promotions->find($promotion);
            $thePromotion->delete();
        } else {
            $promotions = Promotion::all();
            $thePromotion = $promotions->find($promotion);
            $thePromotion->delete();
        }
    }

    public function updateBanner(Request $request)
    {
        $request->validate([
            'bannerTitle' => 'required',
            'bannerCore' => 'required'
        ]);
        
        $bannerArray = Banner::all();
        $banner = $bannerArray->find(1);
        
        $banner->banner_title = $request->bannerTitle;
        $banner->banner_body = $request->bannerCore;
        $banner->save();
    }

    public function customersOrders()
    {
        $orders = Order::all();
        return Inertia::render('Dashboard/CustomerOrders', [
            'Orders' => $orders,
        ]);
    }
}