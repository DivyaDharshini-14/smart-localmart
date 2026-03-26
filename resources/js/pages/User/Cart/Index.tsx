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
        title: 'My Cart',
        href: '/my-cart',
    },
];

interface Product {
    id: number;
    name: string;
    price: string;
    stock: number;
    is_active: boolean;
    shop: {
        id: number;
        name: string;
    };
}

interface CartItem {
    id: number;
    quantity: number;
    product: Product;
    subtotal: number;
}

interface Cart {
    id: number;
    items: CartItem[];
    total: number;
    item_count: number;
}

interface Props {
    cart: Cart;
}

export default function Index({ cart }: Props) {
    const [updatingItem, setUpdatingItem] = useState<number | null>(null);
    const [removingItem, setRemovingItem] = useState<number | null>(null);
    const [checkingOut, setCheckingOut] = useState(false);

    const handleCheckout = () => {
        setCheckingOut(true);
        router.post('/checkout', {}, {
            onFinish: () => setCheckingOut(false),
        });
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        
        setUpdatingItem(itemId);
        router.post('/cart/update', { item_id: itemId, quantity }, {
            onFinish: () => setUpdatingItem(null),
            preserveScroll: true,
        });
    };

    const removeItem = (itemId: number) => {
        setRemovingItem(itemId);
        router.post('/cart/remove', { item_id: itemId }, {
            onFinish: () => setRemovingItem(null),
            preserveScroll: true,
        });
    };

    if (cart.items.length === 0) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="My Cart - Smart LocalMart" />
                
                <div className="p-6 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            Your Cart is Empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Looks like you haven't added any items to your cart yet.
                        </p>
                        <Link
                            href="/shops"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Browse Shops
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Cart - Smart LocalMart" />
            
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            My Cart ({cart.item_count} {cart.item_count === 1 ? 'item' : 'items'})
                        </h1>
                        <Link
                            href="/shops"
                            className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium"
                        >
                            Continue Shopping
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.items.map((item) => (
                                <div
                                    key={item.id}
                                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${
                                        removingItem === item.id ? 'opacity-50' : ''
                                    }`}
                                >
                                    <div className="flex gap-4">
                                        {/* Product Image Placeholder */}
                                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                from {item.product.shop.name}
                                            </p>
                                            <p className="text-green-600 dark:text-green-400 font-medium mt-1">
                                                ₹{parseFloat(item.product.price).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Quantity & Remove */}
                                        <div className="flex flex-col items-end gap-2">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={updatingItem === item.id || item.quantity <= 1}
                                                    className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                                                >
                                                    −
                                                </button>
                                                <span className="px-4 py-1 text-center min-w-[3rem] text-gray-900 dark:text-white border-x border-gray-300 dark:border-gray-600">
                                                    {updatingItem === item.id ? '...' : item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={updatingItem === item.id || item.quantity >= item.product.stock}
                                                    className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Subtotal */}
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Subtotal: ₹{item.subtotal.toFixed(2)}
                                            </p>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                disabled={removingItem === item.id}
                                                className="text-red-600 dark:text-red-400 text-sm hover:underline disabled:opacity-50"
                                            >
                                                {removingItem === item.id ? 'Removing...' : 'Remove'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Stock Warning */}
                                    {item.quantity >= item.product.stock && (
                                        <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                                            ⚠️ Maximum available stock reached
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>Subtotal ({cart.item_count} items)</span>
                                        <span>₹{cart.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>Delivery Fee</span>
                                        <span className="text-green-600 dark:text-green-400">Free</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                                        <span>Total</span>
                                        <span>₹{cart.total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={checkingOut}
                                    className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {checkingOut ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        'Proceed to Checkout'
                                    )}
                                </button>

                                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                                    Secure checkout • Stock will be reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

