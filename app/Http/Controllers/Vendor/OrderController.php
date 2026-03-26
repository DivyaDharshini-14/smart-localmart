<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display list of orders for vendor's shop.
     */
    public function index(): Response
    {
        $shop = auth()->user()->shop;

        if (!$shop) {
            return Inertia::render('Vendor/Orders/Index', [
                'orders' => [],
                'hasShop' => false,
            ]);
        }

        $orders = Order::where('shop_id', $shop->id)
            ->with(['items.product', 'user'])
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status,
                    'created_at' => $order->created_at->toDateTimeString(),
                    'items_count' => $order->items->sum('quantity'),
                    'user' => [
                        'id' => $order->user->id,
                        'name' => $order->user->name,
                    ],
                    'items' => $order->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'product' => [
                                'id' => $item->product->id,
                                'name' => $item->product->name,
                            ],
                        ];
                    }),
                ];
            });

        return Inertia::render('Vendor/Orders/Index', [
            'orders' => $orders,
            'hasShop' => true,
        ]);
    }

    /**
     * Accept a placed order.
     */
    public function accept(Order $order): RedirectResponse
    {
        // Verify ownership
        if ($order->shop_id !== auth()->user()->shop?->id) {
            abort(403, 'Unauthorized action.');
        }

        // Validate status transition
        if (!$order->canTransitionTo(Order::STATUS_ACCEPTED)) {
            return back()->with('error', 'Cannot accept this order. Invalid status.');
        }

        $order->update(['status' => Order::STATUS_ACCEPTED]);

        return back()->with('success', 'Order accepted!');
    }

    /**
     * Mark order as packed.
     */
    public function pack(Order $order): RedirectResponse
    {
        // Verify ownership
        if ($order->shop_id !== auth()->user()->shop?->id) {
            abort(403, 'Unauthorized action.');
        }

        // Validate status transition
        if (!$order->canTransitionTo(Order::STATUS_PACKED)) {
            return back()->with('error', 'Cannot pack this order. Invalid status.');
        }

        $order->update(['status' => Order::STATUS_PACKED]);

        return back()->with('success', 'Order marked as packed! Ready for delivery.');
    }
}
