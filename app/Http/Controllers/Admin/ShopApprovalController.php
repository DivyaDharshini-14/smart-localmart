<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ShopApprovalController extends Controller
{
    /**
     * Display list of pending shops.
     */
    public function index(): Response
    {
        $shops = Shop::with('vendor')
            ->where('is_approved', false)
            ->latest()
            ->get();

        return Inertia::render('Admin/Shops/Index', [
            'shops' => $shops,
        ]);
    }

    /**
     * Approve a shop.
     */
    public function approve(Shop $shop): RedirectResponse
    {
        $shop->update([
            'is_approved' => true,
        ]);

        return back()->with('success', 'Shop approved successfully!');
    }
}
