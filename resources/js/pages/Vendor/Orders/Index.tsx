import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Orders',
        href: '/vendor/orders',
    },
];

interface User {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
}

interface OrderItem {
    id: number;
    quantity: number;
    price: string;
    product: Product;
}

interface Order {
    id: number;
    total_amount: string;
    status: string;
    created_at: string;
    items_count: number;
    user: User;
    items: OrderItem[];
}

interface Props {
    orders: Order[];
    hasShop: boolean;
}

const statusColors: Record<string, string> = {
    placed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    accepted: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    packed: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    picked: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
    delivered: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
};

const statusLabels: Record<string, string> = {
    placed: 'New Order',
    accepted: 'Accepted',
    packed: 'Packed',
    picked: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
};

export default function Index({ orders, hasShop }: Props) {
    const [processingOrder, setProcessingOrder] = useState<number | null>(null);
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    const acceptOrder = (orderId: number) => {
        setProcessingOrder(orderId);
        router.post(`/vendor/orders/${orderId}/accept`, {}, {
            onFinish: () => setProcessingOrder(null),
        });
    };

    const packOrder = (orderId: number) => {
        setProcessingOrder(orderId);
        router.post(`/vendor/orders/${orderId}/pack`, {}, {
            onFinish: () => setProcessingOrder(null),
        });
    };

    if (!hasShop) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Orders - Smart LocalMart" />
                
                <div className="p-6 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Create a Shop First
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            You need to create a shop before you can receive orders.
                        </p>
                        <Link
                            href="/vendor/shop/create"
                            className="inline-block py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Create Shop
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    // Group orders by status
    const newOrders = orders.filter(o => o.status === 'placed');
    const activeOrders = orders.filter(o => ['accepted', 'packed', 'picked'].includes(o.status));
    const completedOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders - Smart LocalMart" />
            
            <div className="p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Incoming Orders
                        </h1>
                        <div className="flex gap-2">
                            {newOrders.length > 0 && (
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                    {newOrders.length} New
                                </span>
                            )}
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No Orders Yet
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                When customers place orders, they'll appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* New Orders */}
                            {newOrders.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                                        New Orders ({newOrders.length})
                                    </h2>
                                    <div className="space-y-4">
                                        {newOrders.map((order) => (
                                            <OrderCard
                                                key={order.id}
                                                order={order}
                                                expanded={expandedOrder === order.id}
                                                onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                                processing={processingOrder === order.id}
                                                onAccept={() => acceptOrder(order.id)}
                                                onPack={() => packOrder(order.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Active Orders */}
                            {activeOrders.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Active Orders ({activeOrders.length})
                                    </h2>
                                    <div className="space-y-4">
                                        {activeOrders.map((order) => (
                                            <OrderCard
                                                key={order.id}
                                                order={order}
                                                expanded={expandedOrder === order.id}
                                                onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                                processing={processingOrder === order.id}
                                                onAccept={() => acceptOrder(order.id)}
                                                onPack={() => packOrder(order.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Completed Orders */}
                            {completedOrders.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Completed Orders ({completedOrders.length})
                                    </h2>
                                    <div className="space-y-4">
                                        {completedOrders.map((order) => (
                                            <OrderCard
                                                key={order.id}
                                                order={order}
                                                expanded={expandedOrder === order.id}
                                                onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                                processing={false}
                                                onAccept={() => {}}
                                                onPack={() => {}}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

interface OrderCardProps {
    order: Order;
    expanded: boolean;
    onToggle: () => void;
    processing: boolean;
    onAccept: () => void;
    onPack: () => void;
}

function OrderCard({ order, expanded, onToggle, processing, onAccept, onPack }: OrderCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Order #{order.id}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                                {statusLabels[order.status]}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Customer: <span className="font-medium">{order.user.name}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.items_count} {order.items_count === 1 ? 'item' : 'items'} • {new Date(order.created_at).toLocaleString()}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ₹{parseFloat(order.total_amount).toFixed(2)}
                        </span>

                        {/* Action Buttons */}
                        {order.status === 'placed' && (
                            <button
                                onClick={onAccept}
                                disabled={processing}
                                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Processing...' : 'Accept Order'}
                            </button>
                        )}

                        {order.status === 'accepted' && (
                            <button
                                onClick={onPack}
                                disabled={processing}
                                className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Processing...' : 'Mark as Packed'}
                            </button>
                        )}

                        {order.status === 'packed' && (
                            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium rounded-lg">
                                Waiting for Pickup
                            </span>
                        )}

                        <button
                            onClick={onToggle}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <svg className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded Items */}
            {expanded && (
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Items</h4>
                    <div className="space-y-2">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                    {item.product.name} × {item.quantity}
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

