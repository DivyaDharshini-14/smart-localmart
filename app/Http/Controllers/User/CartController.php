<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Get or create cart for the authenticated user.
     */
    private function getCart(): Cart
    {
        return Cart::firstOrCreate([
            'user_id' => auth()->id(),
        ]);
    }

    /**
     * Display the cart.
     */
    public function index(): Response
    {
        $cart = $this->getCart()->load('items.product.shop');

        // Calculate totals
        $items = $cart->items->map(function ($item) {
            return [
                'id' => $item->id,
                'quantity' => $item->quantity,
                'product' => [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'price' => $item->product->price,
                    'stock' => $item->product->stock,
                    'is_active' => $item->product->is_active,
                    'shop' => [
                        'id' => $item->product->shop->id,
                        'name' => $item->product->shop->name,
                    ],
                ],
                'subtotal' => $item->product->price * $item->quantity,
            ];
        });

        $total = $items->sum('subtotal');

        return Inertia::render('User/Cart/Index', [
            'cart' => [
                'id' => $cart->id,
                'items' => $items,
                'total' => $total,
                'item_count' => $items->sum('quantity'),
            ],
        ]);
    }

    /**
     * Add item to cart.
     */
    public function add(Request $request): RedirectResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check if product is available
        if (!$product->is_active) {
            return back()->with('error', 'This product is not available.');
        }

        if ($product->stock < 1) {
            return back()->with('error', 'This product is out of stock.');
        }

        $cart = $this->getCart();
        $quantity = $request->quantity ?? 1;

        // Check if item already in cart
        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            $newQuantity = $item->quantity + $quantity;
            
            // Check stock availability
            if ($newQuantity > $product->stock) {
                return back()->with('error', "Only {$product->stock} items available in stock.");
            }

            $item->update(['quantity' => $newQuantity]);
        } else {
            // Check stock availability
            if ($quantity > $product->stock) {
                return back()->with('error', "Only {$product->stock} items available in stock.");
            }

            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'quantity' => $quantity,
            ]);
        }

        return back()->with('success', 'Item added to cart!');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'item_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $item = CartItem::with('product')->findOrFail($request->item_id);

        // Verify ownership
        if ($item->cart->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // Check stock availability
        if ($request->quantity > $item->product->stock) {
            return back()->with('error', "Only {$item->product->stock} items available in stock.");
        }

        $item->update(['quantity' => $request->quantity]);

        return back()->with('success', 'Cart updated!');
    }

    /**
     * Remove item from cart.
     */
    public function remove(Request $request): RedirectResponse
    {
        $request->validate([
            'item_id' => 'required|exists:cart_items,id',
        ]);

        $item = CartItem::findOrFail($request->item_id);

        // Verify ownership
        if ($item->cart->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $item->delete();

        return back()->with('success', 'Item removed from cart.');
    }
}
