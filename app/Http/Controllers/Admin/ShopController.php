<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Shops/Index', [
            'shops' => Shop::with('vendor')->get(),
        ]);
    }

    public function approve(Shop $shop)
    {
        $shop->update(['is_approved' => true]);
        return back();
    }
}

