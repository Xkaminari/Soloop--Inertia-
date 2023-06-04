<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\LaravelIgnition\Recorders\DumpRecorder\Dump;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Dashboard/CreateProductForm');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'productName' => 'required|min:2',
            'productPrice' => 'required|Integer',
            'productDescription' => 'required|min:10|max:300',
            'productQuantity' => 'required|Integer',
            'productImg' => 'required',
        ]);
        
        $productImgPath = Storage::disk('public')->put('ProductImg', $request->file('productImg'));
        $product = new Product();
        $product->name = $request->productName;
        $product->price = $request->productPrice;
        $product->description = $request->productDescription;
        $product->quantity = $request->productQuantity;
        $product->image = "storage/" . $productImgPath;
        
        $product->save();
        
        return redirect()->route("Dashboard");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $theProduct = Product::find($product)->first();
        return Inertia::render('Dashboard/ProductPage', [
            'product' => $theProduct
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        $products = Product::all();
        $theProduct = $products->find($product);
        
        $promotions = Promotion::all();
        if ($theProduct->promotion_id !== null) {
            $currentPromotion = $promotions->find($theProduct->promotion_id);
        }
        
        return Inertia::render('Dashboard/EditProductForm', [
            'product' => $theProduct,
            'promotions' => $promotions,
            'currentPromotion' => $currentPromotion,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'productName' => 'required|min:2',
            'productPrice' => 'required|Integer',
            'productDescription' => 'required|min:10|max:600',
            'productQuantity' => 'required|Integer',
            'productImg' => 'required',
        ]);
        
        $productId = $request->productId ;
        $theProduct = Product::find($productId);
        
        while ($theProduct !== null):
            $udates = array(
                'productName' => $request->productName,
                'productPrice' => $request->productPrice,
                'productDescription' => $request->productDescription,
                'productQuantity' => $request->productQuantity,
                'productImg' => $request->productImg,
            );
            $udatesObj = (object) $udates;
            
            $currentInfo = array(
                'productName' => $theProduct->name,
                'productPrice' => formatNumber($theProduct->price),
                'productDescription' => $theProduct->description,
                'productQuantity' => $theProduct->quantity,
                'productImg' => $theProduct->image,
            );
            $currentInfoObj2 = (object) $currentInfo;
            
            if (isUpdateProductNecessary($udatesObj, $currentInfoObj2)) {
                $theProduct->name = $request->productName;
                $theProduct->price = $request->productPrice;
                $theProduct->description = $request->productDescription;
                $theProduct->quantity = $request->productQuantity;
                
                if ($request->file('productImg') !== null) {
                    $theProductImagePath = str_replace("/", "\\",str_replace("storage/", "",$theProduct->image));
                    unlink(storage_path("app\public\\" . $theProductImagePath));
                    $productImgPath = Storage::disk('public')->put('ProductImg', $request->file('productImg'));
                    $theProduct->image = "storage/" . $productImgPath;
                }
                
                $theProduct->save();
                return redirect()->route("Dashboard");
            } else {
                return redirect()->route("Dashboard");
            }
        endwhile;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        // $product contains the id of the product
        $products = Product::all();
        $theProduct = $products->find($product);
        $theProduct->delete();
        return redirect()->route("Dashboard");
    }
}
