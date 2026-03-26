<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ShopController extends Controller
{
    /**
     * Show vendor shop or status.
     */
    public function index(): Response
    {
        $shop = auth()->user()->shop;

        return Inertia::render('Vendor/Shop/Index', [
            'shop' => $shop,
        ]);
    }

    /**
     * Show create shop form.
     */
    public function create(): Response
    {
        // Check if vendor already has a shop
        if (auth()->user()->shop) {
            return Inertia::render('Vendor/Shop/Index', [
                'shop' => auth()->user()->shop,
            ]);
        }

        return Inertia::render('Vendor/Shop/Create');
    }

    /**
     * Store a new shop.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:grocery,vegetables,dairy',
            'address' => 'nullable|string',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        // Check if vendor already has a shop
        if (auth()->user()->shop) {
            return redirect()->route('vendor.shop.index')
                ->with('error', 'You already have a shop.');
        }

        Shop::create([
            'vendor_id' => auth()->id(),
            'name' => $request->name,
            'category' => $request->category,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return redirect()->route('vendor.shop.index')
            ->with('success', 'Shop created successfully! Waiting for admin approval.');
    }
}
