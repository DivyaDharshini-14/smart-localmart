import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Shop {
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
    subtotal: number;
    product: Product;
}

interface Order {
    id: number;
    total_amount: string;
    status: string;
    created_at: string;
    shop: Shop;
    items: OrderItem[];
}

interface Props {
    order: Order;
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

const statusDescriptions: Record<string, string> = {
    placed: 'Your order has been placed and is waiting for the shop to accept.',
    accepted: 'The shop has accepted your order and is preparing it.',
    packed: 'Your order is packed and ready for pickup by delivery.',
    picked: 'Your order is on the way!',
    delivered: 'Your order has been delivered. Enjoy!',
    cancelled: 'This order has been cancelled.',
};

export default function Show({ order }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'My Orders',
            href: '/orders',
        },
        {
            title: `Order #${order.id}`,
            href: `/orders/${order.id}`,
        },
    ];

    const steps = ['placed', 'accepted', 'packed', 'picked', 'delivered'];
    const currentStepIndex = steps.indexOf(order.status);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order #${order.id} - Smart LocalMart`} />
            
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Order #{order.id}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Placed on {new Date(order.created_at).toLocaleString()}
                            </p>
                        </div>
                        <Link
                            href="/orders"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            ← Back to Orders
                        </Link>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                        <div className="flex items-center gap-4 mb-6">
                            <span className={`px-4 py-2 text-sm font-medium rounded-full ${statusColors[order.status]}`}>
                                {statusLabels[order.status]}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {statusDescriptions[order.status]}
                        </p>

                        {/* Progress Tracker */}
                        {order.status !== 'cancelled' && (
                            <div className="relative">
                                <div className="flex justify-between mb-2">
                                    {steps.map((step, index) => {
                                        const isCompleted = index <= currentStepIndex;
                                        const isCurrent = index === currentStepIndex;
                                        
                                        return (
                                            <div key={step} className="flex flex-col items-center flex-1">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10 ${
                                                    isCompleted 
                                                        ? 'bg-green-600 text-white' 
                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                                } ${isCurrent ? 'ring-4 ring-green-200 dark:ring-green-800' : ''}`}>
                                                    {isCompleted ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        index + 1
                                                    )}
                                                </div>
                                                <span className={`text-xs mt-2 text-center ${
                                                    isCompleted 
                                                        ? 'text-green-600 dark:text-green-400 font-medium' 
                                                        : 'text-gray-500 dark:text-gray-400'
                                                }`}>
                                                    {statusLabels[step].split(' ')[0]}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* Progress Line */}
                                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-0" style={{ marginLeft: '2rem', marginRight: '2rem' }}>
                                    <div 
                                        className="h-full bg-green-600 transition-all duration-500"
                                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shop Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Shop Details
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{order.shop.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Order Items ({order.items.length})
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {item.product.name}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                ₹{parseFloat(item.price).toFixed(2)} × {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        ₹{item.subtotal.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Total */}
                        <div className="p-6 bg-gray-50 dark:bg-gray-700/50">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    ₹{parseFloat(order.total_amount).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

