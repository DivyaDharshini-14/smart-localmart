<?php

namespace App\Http\Controllers\Delivery;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display list of orders available for pickup and assigned orders.
     */
    public function index(): Response
    {
        // Get packed orders (available for pickup) OR orders assigned to this delivery partner
        $orders = Order::where(function ($query) {
                // Available for pickup (packed and no delivery partner assigned)
                $query->where('status', Order::STATUS_PACKED)
                      ->whereNull('delivery_partner_id');
            })
            ->orWhere(function ($query) {
                // Already picked by this delivery partner
                $query->where('delivery_partner_id', auth()->id())
                      ->whereIn('status', [Order::STATUS_PICKED, Order::STATUS_DELIVERED]);
            })
            ->with(['items.product', 'user', 'shop'])
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total_amount' => $order->total_amount,
                    'status' => $order->status,
                    'created_at' => $order->created_at->toDateTimeString(),
                    'items_count' => $order->items->sum('quantity'),
                    'delivery_partner_id' => $order->delivery_partner_id,
                    'user' => [
                        'id' => $order->user->id,
                        'name' => $order->user->name,
                    ],
                    'shop' => [
                        'id' => $order->shop->id,
                        'name' => $order->shop->name,
                        'address' => $order->shop->address,
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

        return Inertia::render('Delivery/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Pick up an order (assign to delivery partner).
     */
    public function pick(Order $order): RedirectResponse
    {
        // Validate order is available for pickup
        if ($order->status !== Order::STATUS_PACKED) {
            return back()->with('error', 'This order is not ready for pickup.');
        }

        if ($order->delivery_partner_id !== null) {
            return back()->with('error', 'This order has already been picked up by another delivery partner.');
        }

        // Assign to this delivery partner and update status
        $order->update([
            'status' => Order::STATUS_PICKED,
            'delivery_partner_id' => auth()->id(),
        ]);

        return back()->with('success', 'Order picked up! Head to the shop for collection.');
    }

    /**
     * Mark order as delivered.
     */
    public function deliver(Order $order): RedirectResponse
    {
        // Verify this order is assigned to this delivery partner
        if ($order->delivery_partner_id !== auth()->id()) {
            abort(403, 'This order is not assigned to you.');
        }

        // Validate order status
        if ($order->status !== Order::STATUS_PICKED) {
            return back()->with('error', 'This order cannot be marked as delivered.');
        }

        $order->update([
            'status' => Order::STATUS_DELIVERED,
        ]);

        return back()->with('success', 'Order delivered successfully! Great job! 🎉');
    }
}
