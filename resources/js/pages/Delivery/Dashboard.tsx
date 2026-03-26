import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Delivery Dashboard - Smart LocalMart" />
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">Delivery Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Pick up orders and deliver them to customers.</p>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Available Orders Card */}
                    <Link
                        href="/delivery/orders"
                        className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Available Orders</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Pick up orders for delivery</p>
                            </div>
                        </div>
                    </Link>

                    {/* My Deliveries Card */}
                    <Link
                        href="/delivery/orders"
                        className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-orange-500"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">My Deliveries</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Track active deliveries</p>
                            </div>
                        </div>
                    </Link>

                    {/* Completed Card */}
                    <Link
                        href="/delivery/orders"
                        className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Completed</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">View delivery history</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* How It Works */}
                <div className="mt-8 bg-gradient-to-r from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        How Delivery Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 font-semibold">
                                1
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Pick Order</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Select a packed order to deliver</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center flex-shrink-0 font-semibold">
                                2
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Collect from Shop</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Go to the shop and collect the order</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 font-semibold">
                                3
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Deliver</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Deliver to customer and mark complete</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
