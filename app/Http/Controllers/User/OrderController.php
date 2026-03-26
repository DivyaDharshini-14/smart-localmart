<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display list of user's orders.
     */
    public function index(): Response
    {
        $orders = Order::where('user_id', auth()->id())
            ->with(['items.product', 'shop'])
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status,
                    'created_at' => $order->created_at->toDateTimeString(),
                    'items_count' => $order->items->sum('quantity'),
                    'shop' => [
                        'id' => $order->shop->id,
                        'name' => $order->shop->name,
                    ],
                ];
            });

        return Inertia::render('User/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display single order details.
     */
    public function show(Order $order): Response
    {
        // Verify ownership
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $order->load(['items.product', 'shop']);

        return Inertia::render('User/Orders/Show', [
            'order' => [
                'id' => $order->id,
                'total_amount' => $order->total_amount,
                'status' => $order->status,
                'created_at' => $order->created_at->toDateTimeString(),
                'shop' => [
                    'id' => $order->shop->id,
                    'name' => $order->shop->name,
                ],
                'items' => $order->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'subtotal' => $item->price * $item->quantity,
                        'product' => [
                            'id' => $item->product->id,
                            'name' => $item->product->name,
                        ],
                    ];
                }),
            ],
        ]);
    }
}
