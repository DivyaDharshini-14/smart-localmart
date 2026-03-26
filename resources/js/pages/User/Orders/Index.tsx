import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'My Orders',
        href: '/orders',
    },
];

interface Shop {
    id: number;
    name: string;
}

interface Order {
    id: number;
    total_amount: string;
    status: string;
    created_at: string;
    items_count: number;
    shop: Shop;
}

interface Props {
    orders: Order[];
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
    placed: 'Order Placed',
    accepted: 'Accepted by Shop',
    packed: 'Packed & Ready',
    picked: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
};

export default function Index({ orders }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Orders - Smart LocalMart" />
            
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            My Orders
                        </h1>
                        <Link
                            href="/shops"
                            className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium"
                        >
                            Continue Shopping
                        </Link>
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
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                You haven't placed any orders yet. Start shopping!
                            </p>
                            <Link
                                href="/shops"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Browse Shops
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={`/orders/${order.id}`}
                                    className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        Order #{order.id}
                                                    </h3>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                                                        {statusLabels[order.status]}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    from <span className="font-medium">{order.shop.name}</span>
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {order.items_count} {order.items_count === 1 ? 'item' : 'items'} • {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                                    ₹{parseFloat(order.total_amount).toFixed(2)}
                                                </span>
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    {order.status !== 'cancelled' && (
                                        <div className="px-6 pb-4">
                                            <div className="flex items-center gap-1">
                                                {['placed', 'accepted', 'packed', 'picked', 'delivered'].map((step, index) => {
                                                    const steps = ['placed', 'accepted', 'packed', 'picked', 'delivered'];
                                                    const currentIndex = steps.indexOf(order.status);
                                                    const isCompleted = index <= currentIndex;
                                                    
                                                    return (
                                                        <div
                                                            key={step}
                                                            className={`h-1 flex-1 rounded-full ${
                                                                isCompleted 
                                                                    ? 'bg-green-500' 
                                                                    : 'bg-gray-200 dark:bg-gray-700'
                                                            }`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

