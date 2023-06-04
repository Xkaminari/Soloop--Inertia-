<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'welcome'])->name('home');

Route::get('/Auth/SignUp', [AuthController::class, 'signUp']);
Route::post('/User/SignUp', [AuthController::class, 'storeUser']);

Route::get('/Auth/Login', [AuthController::class, 'login'])->name('login');
Route::get('/User/Login/error', [AuthController::class, 'loginError'])->name('Login.error');
Route::post('/User/authenticate', [AuthController::class, 'authenticate']);
Route::post('/User/Logout', [AuthController::class, 'logout']);

Route::get('/Payment', [PaymentController::class, 'index'])->name('index');
Route::post('/Payment/checkout', [PaymentController::class, 'checkout'])->name('checkout');
Route::get('/Payment/success', [PaymentController::class, 'success'])->name('payment.success');
Route::get('/Payment/testSuccess', [PaymentController::class, 'testSuccess'])->name('payment.test.success');
Route::get('/Payment/cancel', [PaymentController::class, 'cancel'])->name('payment.cancel');

Route::get('/Auth/UserProfil', [AuthController::class, 'editProfil'])->name('edit.profil');
Route::post('/Auth/UpdateUserProfil', [AuthController::class, 'updateProfil'])->name('update.profil');

Route::get('/MesCommandes', [HomeController::class, 'myOrders'])->name('user.orders');

Route::get('/Boutique', [HomeController::class, 'boutique']);

Route::get('/product/{product}', [ProductController::class, 'show'])->name('Show.product');

Route::get('/Cart', [HomeController::class, 'cart'])->name('cart');
Route::post('/Cart/AddProduct/{productId}', [HomeController::class, 'addInCart'])->name('addProduct');
Route::delete('/Cart/RemoveProduct/{productId}', [HomeController::class, 'removeProduct'])->name('removeProduct');

Route::get('/Apropos', [HomeController::class, 'Apropos'])->name('Apropos');

Route::get('/Blog', [HomeController::class, 'blog'])->name('Blog');
Route::get('/Blog/Ccp', [HomeController::class, 'ccpArticle'])->name('Blog.Ccp');
Route::get('/Blog/Cep', [HomeController::class, 'cepArticle'])->name('Blog.Cep');

Route::middleware(['admin'])->group(function () {
    // CRUD promotion
    Route::get('/Dashboard/Promotion', [HomeController::class, 'promotion'])->name('promotion');
    Route::post('promotion/creat', [HomeController::class, 'creatPromotion'])->name('promotion.creat');
    Route::get('promotion/edit/{promotion}', [HomeController::class, 'editPromotion'])->name('promotion.edit');
    Route::post('promotion/update', [HomeController::class, 'updatePromotion'])->name('promotion.update');
    Route::delete('promotion/destroy/{promotion}', [HomeController::class, 'destroyPromotion'])->name('promotion.destroy');
    Route::get('Dashboard/CustomerOrders', [HomeController::class, 'customersOrders'])->name('CustomerOrders');

    Route::post('banner/update', [HomeController::class, 'updateBanner'])->name('upadate.banner');
    
    // CRUD Products
    Route::get('/Dashboard/allProducts', [HomeController::class, 'allProducts'])->name('allProducts');
    Route::resource("products", ProductController::class);
    Route::post("products/update", [ProductController::class, 'update'])->name('products/update');
});