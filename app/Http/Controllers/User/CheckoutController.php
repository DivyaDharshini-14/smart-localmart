<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    /**
     * Process checkout and create order.
     * CRITICAL: Uses DB transaction for stock deduction.
     */
    public function store(): RedirectResponse
    {
        $cart = Cart::with('items.product.shop')
            ->where('user_id', auth()->id())
            ->first();

        // Validate cart exists and has items
        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }

        // Validate all products are from approved shops
        foreach ($cart->items as $item) {
            if (!$item->product->shop->is_approved) {
                return redirect()->route('cart.index')
                    ->with('error', "Shop '{$item->product->shop->name}' is no longer available.");
            }
        }

        // Check if all items are from the same shop (single-shop cart logic)
        $shopIds = $cart->items->pluck('product.shop_id')->unique();
        if ($shopIds->count() > 1) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart contains items from multiple shops. Please order from one shop at a time.');
        }

        $shopId = $shopIds->first();

        try {
            DB::transaction(function () use ($cart, $shopId) {
                $total = 0;

                // Validate stock and calculate total
                foreach ($cart->items as $item) {
                    // Lock the product row for update
                    $product = $item->product()->lockForUpdate()->first();

                    if (!$product->is_active) {
                        throw new \Exception("Product '{$product->name}' is no longer available.");
                    }

                    if ($item->quantity > $product->stock) {
                        throw new \Exception("Insufficient stock for '{$product->name}'. Only {$product->stock} available.");
                    }

                    $total += $product->price * $item->quantity;
                }

                // Create order
                $order = Order::create([
                    'user_id' => auth()->id(),
                    'shop_id' => $shopId,
                    'total_amount' => $total,
                    'status' => Order::STATUS_PLACED,
                ]);

                // Create order items and deduct stock
                foreach ($cart->items as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->product->price,
                    ]);

                    // CRITICAL: Deduct stock
                    $item->product->decrement('stock', $item->quantity);
                }

                // Clear cart after successful order
                $cart->items()->delete();
            });

            return redirect()->route('user.orders.index')
                ->with('success', 'Order placed successfully!');

        } catch (\Exception $e) {
            return redirect()->route('cart.index')
                ->with('error', $e->getMessage());
        }
    }
}
