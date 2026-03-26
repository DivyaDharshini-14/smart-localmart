<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use Inertia\Inertia;
use Inertia\Response;

class ShopBrowseController extends Controller
{
    /**
     * Display list of approved shops.
     */
    public function index(): Response
    {
        $shops = Shop::where('is_approved', true)
            ->withCount(['products' => function ($query) {
                $query->where('is_active', true)->where('stock', '>', 0);
            }])
            ->latest()
            ->get();

        return Inertia::render('User/Shops/Index', [
            'shops' => $shops,
        ]);
    }

    /**
     * Display shop products.
     */
    public function show(Shop $shop): Response
    {
        // Only show approved shops
        if (!$shop->is_approved) {
            abort(404);
        }

        $products = $shop->products()
            ->where('is_active', true)
            ->where('stock', '>', 0)
            ->get();

        return Inertia::render('User/Shops/Show', [
            'shop' => $shop,
            'products' => $products,
        ]);
    }
}
