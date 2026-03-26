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
            {/* Top Bar */}
            <div className="py-1 bg-primary">
                <div className="container">
                    <div className="row no-gutters d-flex align-items-start align-items-center px-md-0">
                        <div className="col-lg-12 d-block">
                            <div className="row d-flex">
                                <div className="col-md pr-4 d-flex topper align-items-center">
                                    <div className="icon mr-2 d-flex justify-content-center align-items-center">
                                        <span className="icon-phone2"></span>
                                    </div>
                                    <span className="text">+ 1235 2355 98</span>
                                </div>
                                <div className="col-md pr-4 d-flex topper align-items-center">
                                    <div className="icon mr-2 d-flex justify-content-center align-items-center">
                                        <span className="icon-paper-plane"></span>
                                    </div>
                                    <span className="text">youremail@email.com</span>
                                </div>
                                <div className="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                                    <span className="text">3-5 Business days delivery &amp; Free Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <Link href={home().url} className="navbar-brand">
                        Smart LocalMart
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-controls="ftco-nav"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="oi oi-menu"></span> Menu
                    </button>

                    <div 
                        className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
                        id="ftco-nav"
                    >
                        <ul className="navbar-nav ml-auto">
                            <li className={`nav-item ${activePage === 'home' ? 'active' : ''}`}>
                                <Link href={home().url} className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className={`nav-item dropdown ${activePage.startsWith('shop') ? 'active' : ''}`}>
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="dropdown04"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Shop
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdown04">
                                    <Link href="/shop" className="dropdown-item">
                                        Shop
                                    </Link>
                                    <Link href="/wishlist" className="dropdown-item">
                                        Wishlist
                                    </Link>
                                    <Link href="/product-single" className="dropdown-item">
                                        Single Product
                                    </Link>
                                    <Link href="/cart" className="dropdown-item">
                                        Cart
                                    </Link>
                                    <Link href="/checkout" className="dropdown-item">
                                        Checkout
                                    </Link>
                                </div>
                            </li>
                            <li className={`nav-item ${activePage === 'about' ? 'active' : ''}`}>
                                <Link href="/about" className="nav-link">
                                    About
                                </Link>
                            </li>
                            <li className={`nav-item ${activePage === 'blog' ? 'active' : ''}`}>
                                <Link href="/blog" className="nav-link">
                                    Blog
                                </Link>
                            </li>
                            <li className={`nav-item ${activePage === 'contact' ? 'active' : ''}`}>
                                <Link href="/contact" className="nav-link">
                                    Contact
                                </Link>
                            </li>
                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <Link href={dashboard().url} className="nav-link">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Form method="post" action={logout().url}>
                                            <button type="submit" className="nav-link btn btn-link" style={{ border: 'none', background: 'none', padding: 0 }}>
                                                Logout
                                            </button>
                                        </Form>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link href={login().url} className="nav-link">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href={register().url} className="nav-link">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item cta cta-colored">
                                <Link href="/cart" className="nav-link">
                                    <span className="icon-shopping_cart"></span>[0]
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

