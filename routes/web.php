<?php

use App\Http\Controllers\Vendor\ShopController;
use App\Http\Controllers\Vendor\ProductController;
use App\Http\Controllers\Vendor\OrderController as VendorOrderController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ShopController as AdminShopController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ShopApprovalController;
use App\Http\Controllers\Delivery\OrderController as DeliveryOrderController;
use App\Http\Controllers\User\ShopBrowseController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\CheckoutController;
use App\Http\Controllers\User\OrderController as UserOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('welcome');

Route::get('dashboard', function () {
    $role = auth()->user()->role;

    return match ($role) {
        'admin' => Inertia::render('Admin/Dashboard'),
        'vendor' => Inertia::render('Vendor/Dashboard'),
        'delivery' => Inertia::render('Delivery/Dashboard'),
        default => Inertia::render('User/Dashboard'),
    };
})->middleware(['auth'])->name('dashboard');

// Vegefoods Pages
Route::get('shop', function () {
    return Inertia::render('shop');
})->name('shop');

Route::get('about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('blog', function () {
    return Inertia::render('blog');
})->name('blog');

Route::get('contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('cart', function () {
    return Inertia::render('cart');
})->name('cart');

Route::get('checkout', function () {
    return Inertia::render('checkout');
})->name('checkout');

Route::get('wishlist', function () {
    return Inertia::render('wishlist');
})->name('wishlist');

Route::get('product-single', function () {
    return Inertia::render('product-single');
})->name('product-single');

/*
|--------------------------------------------------------------------------
| Vendor Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->prefix('vendor')->name('vendor.')->group(function () {
    // Shop routes
    Route::get('/shop/create', [ShopController::class, 'create'])
        ->name('shop.create');

    Route::post('/shop', [ShopController::class, 'store'])
        ->name('shop.store');

    Route::get('/shop', [ShopController::class, 'index'])
        ->name('shop.index');

    // Product routes
    Route::get('/products', [ProductController::class, 'index'])
        ->name('products.index');

    Route::get('/products/create', [ProductController::class, 'create'])
        ->name('products.create');

    Route::post('/products', [ProductController::class, 'store'])
        ->name('products.store');

    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
        ->name('products.edit');

    Route::put('/products/{product}', [ProductController::class, 'update'])
        ->name('products.update');

    Route::post('/products/{product}/toggle', [ProductController::class, 'toggle'])
        ->name('products.toggle');

    // Vendor Order routes
    Route::get('/orders', [VendorOrderController::class, 'index'])
        ->name('orders.index');

    Route::post('/orders/{order}/accept', [VendorOrderController::class, 'accept'])
        ->name('orders.accept');

    Route::post('/orders/{order}/pack', [VendorOrderController::class, 'pack'])
        ->name('orders.pack');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/users', [UserController::class, 'index'])
        ->name('users.index');

    Route::get('/shops', [AdminShopController::class, 'index'])
        ->name('shops.index');

    Route::post('/shops/{shop}/approve', [AdminShopController::class, 'approve'])
        ->name('shops.approve');

    Route::get('/orders', [AdminOrderController::class, 'index'])
        ->name('orders.index');

    Route::post('/orders/{order}/assign-delivery', [AdminOrderController::class, 'assignDelivery'])
        ->name('orders.assignDelivery');
});

/*
|--------------------------------------------------------------------------
| Delivery Partner Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->prefix('delivery')->name('delivery.')->group(function () {
    // View available and assigned orders
    Route::get('/orders', [DeliveryOrderController::class, 'index'])
        ->name('orders.index');

    // Pick up an order
    Route::post('/orders/{order}/pick', [DeliveryOrderController::class, 'pick'])
        ->name('orders.pick');

    // Mark order as delivered
    Route::post('/orders/{order}/deliver', [DeliveryOrderController::class, 'deliver'])
        ->name('orders.deliver');
});

/*
|--------------------------------------------------------------------------
| User Browsing & Cart Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {
    // Shop browsing
    Route::get('/shops', [ShopBrowseController::class, 'index'])
        ->name('shops.index');

    Route::get('/shops/{shop}', [ShopBrowseController::class, 'show'])
        ->name('shops.show');

    // Cart
    Route::get('/my-cart', [CartController::class, 'index'])
        ->name('cart.index');

    Route::post('/cart/add', [CartController::class, 'add'])
        ->name('cart.add');

    Route::post('/cart/update', [CartController::class, 'update'])
        ->name('cart.update');

    Route::post('/cart/remove', [CartController::class, 'remove'])
        ->name('cart.remove');

    // Checkout
    Route::post('/checkout', [CheckoutController::class, 'store'])
        ->name('checkout.store');

    // User Orders
    Route::get('/orders', [UserOrderController::class, 'index'])
        ->name('user.orders.index');

    Route::get('/orders/{order}', [UserOrderController::class, 'show'])
        ->name('user.orders.show');
});

require __DIR__.'/settings.php';
