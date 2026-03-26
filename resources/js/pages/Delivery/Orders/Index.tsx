import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Orders',
        href: '/delivery/orders',
    },
];

interface User {
    id: number;
    name: string;
}

interface Shop {
    id: number;
    name: string;
    address: string | null;
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
    delivery_partner_id: number | null;
    user: User;
    shop: Shop;
    items: OrderItem[];
}

interface Props {
    orders: Order[];
}

const statusColors: Record<string, string> = {
    packed: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
    picked: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
    delivered: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
};

const statusLabels: Record<string, string> = {
    packed: 'Ready for Pickup',
    picked: 'Out for Delivery',
    delivered: 'Delivered',
};

export default function Index({ orders }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number } } }>().props;
    const [processingOrder, setProcessingOrder] = useState<number | null>(null);
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    const pickOrder = (orderId: number) => {
        setProcessingOrder(orderId);
        router.post(`/delivery/orders/${orderId}/pick`, {}, {
            onFinish: () => setProcessingOrder(null),
        });
    };

    const deliverOrder = (orderId: number) => {
        setProcessingOrder(orderId);
        router.post(`/delivery/orders/${orderId}/deliver`, {}, {
            onFinish: () => setProcessingOrder(null),
        });
    };

    // Group orders
    const availableOrders = orders.filter(o => o.status === 'packed' && o.delivery_partner_id === null);
    const myActiveOrders = orders.filter(o => o.status === 'picked' && o.delivery_partner_id === auth.user.id);
    const completedOrders = orders.filter(o => o.status === 'delivered');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Delivery Orders - Smart LocalMart" />
            
            <div className="p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Delivery Orders
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Pick up orders and deliver them to customers
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {availableOrders.length > 0 && (
                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium animate-pulse">
                                    {availableOrders.length} Available
                                </span>
                            )}
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No Orders Available
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                When vendors pack orders, they'll appear here for pickup.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Available for Pickup */}
                            {availableOrders.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
                                        Available for Pickup ({availableOrders.length})
                                    </h2>
                                    <div className="space-y-4">
                                        {availableOrders.map((order) => (
                                            <OrderCard
                                                key={order.id}
                                                order={order}
                                                expanded={expandedOrder === order.id}
                                                onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                                processing={processingOrder === order.id}
                                                onPick={() => pickOrder(order.id)}
                                                onDeliver={() => deliverOrder(order.id)}
                                                currentUserId={auth.user.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* My Active Deliveries */}
                            {myActiveOrders.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-orange-500" />
                                        My Active Deliveries ({myActiveOrders.length})
                                    </h2>
                                    <div className="space-y-4">
                                        {myActiveOrders.map((order) => (
                                            <OrderCard
                                                key={order.id}
                                                order={order}
                                                expanded={expandedOrder === order.id}
                                                onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                                processing={processingOrder === order.id}
                                                onPick={() => pickOrder(order.id)}
                                                onDeliver={() => deliverOrder(order.id)}
                                                currentUserId={auth.user.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Completed Today */}
                            {completedOrders.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-green-500" />
                                        Completed ({completedOrders.length})
                                    </h2>
                                    <div className="space-y-4">
                                        {completedOrders.map((order) => (
                                            <OrderCard
                                                key={order.id}
                                                order={order}
                                                expanded={expandedOrder === order.id}
                                                onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                                processing={false}
                                                onPick={() => {}}
                                                onDeliver={() => {}}
                                                currentUserId={auth.user.id}
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
    onPick: () => void;
    onDeliver: () => void;
    currentUserId: number;
}

function OrderCard({ order, expanded, onToggle, processing, onPick, onDeliver, currentUserId }: OrderCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                Order #{order.id}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                                {statusLabels[order.status]}
                            </span>
                        </div>
                        
                        {/* Shop Info */}
                        <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Pickup: {order.shop.name}
                            </p>
                            {order.shop.address && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                                    {order.shop.address}
                                </p>
                            )}
                        </div>

                        {/* Customer Info */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Deliver to: <span className="font-medium">{order.user.name}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {order.items_count} {order.items_count === 1 ? 'item' : 'items'} • {new Date(order.created_at).toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ₹{parseFloat(order.total_amount).toFixed(2)}
                        </span>

                        {/* Action Buttons */}
                        {order.status === 'packed' && order.delivery_partner_id === null && (
                            <button
                                onClick={onPick}
                                disabled={processing}
                                className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Picking...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                        Pick Order
                                    </>
                                )}
                            </button>
                        )}

                        {order.status === 'picked' && order.delivery_partner_id === currentUserId && (
                            <button
                                onClick={onDeliver}
                                disabled={processing}
                                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Delivering...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Mark Delivered
                                    </>
                                )}
                            </button>
                        )}

                        {order.status === 'delivered' && (
                            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium rounded-lg flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Delivered
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

