<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display list of products for the vendor's shop.
     */
    public function index(): Response
    {
        $shop = auth()->user()->shop;

        $products = $shop
            ? $shop->products()->latest()->get()
            : collect([]);

        return Inertia::render('Vendor/Products/Index', [
            'products' => $products,
            'shop' => $shop,
        ]);
    }

    /**
     * Show create product form.
     */
    public function create(): Response|RedirectResponse
    {
        $shop = auth()->user()->shop;

        // Check if vendor has an approved shop
        if (!$shop) {
            return redirect()->route('vendor.shop.create')
                ->with('error', 'Please create a shop first.');
        }

        if (!$shop->is_approved) {
            return redirect()->route('vendor.shop.index')
                ->with('error', 'Your shop must be approved before adding products.');
        }

        return Inertia::render('Vendor/Products/Create');
    }

    /**
     * Store a new product.
     */
    public function store(Request $request): RedirectResponse
    {
        $shop = auth()->user()->shop;

        // Verify shop exists and is approved
        if (!$shop || !$shop->is_approved) {
            return redirect()->route('vendor.shop.index')
                ->with('error', 'You need an approved shop to add products.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0.01',
            'stock' => 'required|integer|min:0',
        ]);

        Product::create([
            'shop_id' => $shop->id,
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
        ]);

        return redirect()->route('vendor.products.index')
            ->with('success', 'Product added successfully!');
    }

    /**
     * Show edit product form.
     */
    public function edit(Product $product): Response|RedirectResponse
    {
        // Verify ownership
        if ($product->shop_id !== auth()->user()->shop?->id) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Vendor/Products/Edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update product.
     */
    public function update(Request $request, Product $product): RedirectResponse
    {
        // Verify ownership
        if ($product->shop_id !== auth()->user()->shop?->id) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0.01',
            'stock' => 'required|integer|min:0',
        ]);

        $product->update($request->only('name', 'price', 'stock'));

        return redirect()->route('vendor.products.index')
            ->with('success', 'Product updated successfully!');
    }

    /**
     * Toggle product active status.
     */
    public function toggle(Product $product): RedirectResponse
    {
        // Verify ownership
        if ($product->shop_id !== auth()->user()->shop?->id) {
            abort(403, 'Unauthorized action.');
        }

        $product->update([
            'is_active' => !$product->is_active,
        ]);

        $status = $product->is_active ? 'activated' : 'deactivated';

        return back()->with('success', "Product {$status} successfully!");
    }
}
