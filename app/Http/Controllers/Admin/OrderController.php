<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Orders/Index', [
            'orders' => Order::with('shop', 'user', 'deliveryPartner')->get(),
            'deliveryPartners' => User::where('role', 'delivery')->get(),
        ]);
    }

    public function assignDelivery(Request $request, Order $order)
    {
        $request->validate([
            'delivery_partner_id' => 'required|exists:users,id',
        ]);

        $order->update([
            'delivery_partner_id' => $request->delivery_partner_id,
            'status' => 'picked',
        ]);

        return back();
    }
}

