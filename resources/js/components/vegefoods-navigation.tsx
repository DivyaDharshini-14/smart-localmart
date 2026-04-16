import { Link, usePage } from '@inertiajs/react';
import { Form } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { dashboard, home, login, logout, register } from '@/routes';
import type { SharedData } from '@/types';

interface NavigationProps {
    activePage?: string;
}

export default function VegefoodsNavigation({ activePage = 'home' }: NavigationProps) {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth?.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Initialize Bootstrap dropdown on hover (matching original behavior)
        const initDropdowns = () => {
            if (window.$) {
                (window.$ as any)('nav .dropdown').hover(
                    function (this: HTMLElement) {
                        const $this = (window.$ as any)(this);
                        $this.addClass('show');
                        $this.find('> a').attr('aria-expanded', true);
                        $this.find('.dropdown-menu').addClass('show');
                    },
                    function (this: HTMLElement) {
                        const $this = (window.$ as any)(this);
                        $this.removeClass('show');
                        $this.find('> a').attr('aria-expanded', false);
                        $this.find('.dropdown-menu').removeClass('show');
                    }
                );
            }
        };

        // Wait for jQuery and Bootstrap to load
        if (window.$) {
            initDropdowns();
        } else {
            const checkJQuery = setInterval(() => {
                if (window.$) {
                    clearInterval(checkJQuery);
                    initDropdowns();
                }
            }, 100);

            return () => clearInterval(checkJQuery);
        }
    }, []);

    return (
        <>
            {/* Navigation */}
            <nav
                className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light"
                id="ftco-navbar"
                style={{ backgroundColor: '#fff', borderBottom: '1px solid #e8e8e8', padding: '0' }}
            >
                <div className="container" style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', height: '60px', padding: '0 20px' }}>
                    {/* Brand */}
                    <Link
                        href={home().url}
                        className="navbar-brand"
                        style={{
                            color: '#82ae46',
                            fontWeight: '700',
                            fontSize: '1.4rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            lineHeight: '60px',
                            marginRight: 'auto',
                            flexShrink: 0,
                            padding: '0',
                        }}
                    >
                        Smart LocalMart
                    </Link>

                    {/* Mobile toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-controls="ftco-nav"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                        style={{ border: '1px solid #ccc', padding: '4px 8px', display: 'none' }}
                    >
                        <span style={{ fontSize: '1.2rem', color: '#555' }}>&#9776;</span>
                    </button>

                    <div
                        className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`}
                        id="ftco-nav"
                        style={{ flexGrow: 0 }}
                    >
                        <ul className="navbar-nav" style={{ alignItems: 'center', flexWrap: 'nowrap', margin: 0 }}>
                            <li className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
                                <Link href={home().url} className="nav-link">Home</Link>
                            </li>
                            <li className={`nav-item dropdown ${activePage.startsWith('shop') ? 'active' : ''}`}>
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Shop
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdown04">
                                    <Link href="/shop" className="dropdown-item">Shop</Link>
                                    <Link href="/wishlist" className="dropdown-item">Wishlist</Link>
                                    <Link href="/product-single" className="dropdown-item">Single Product</Link>
                                    <Link href="/cart" className="dropdown-item">Cart</Link>
                                    <Link href="/checkout" className="dropdown-item">Checkout</Link>
                                </div>
                            </li>
                            <li className={`nav-item ${activePage === 'about' ? 'active' : ''}`}>
                                <Link href="/about" className="nav-link">About</Link>
                            </li>
                            <li className={`nav-item ${activePage === 'blog' ? 'active' : ''}`}>
                                <Link href="/blog" className="nav-link">Blog</Link>
                            </li>
                            <li className={`nav-item ${activePage === 'contact' ? 'active' : ''}`}>
                                <Link href="/contact" className="nav-link">Contact</Link>
                            </li>
                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <Link href={dashboard().url} className="nav-link">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Form method="post" action={logout().url}>
                                            <button type="submit" className="nav-link btn btn-link" style={{ border: 'none', background: 'none' }}>
                                                Logout
                                            </button>
                                        </Form>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link href={login().url} className="nav-link">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href={register().url} className="nav-link">Register</Link>
                                    </li>
                                </>
                            )}
                            {/* Cart */}
                            <li className="nav-item">
                                <Link href="/cart" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                    <span className="icon-shopping_cart"></span>
                                    <span>[0]</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

