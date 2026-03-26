import { Head, Link } from '@inertiajs/react';
import { ReactNode, useEffect, useRef } from 'react';
import VegefoodsNavigation from './vegefoods-navigation';

interface VegefoodsLayoutProps {
    children: ReactNode;
    title: string;
    activePage?: string;
    breadcrumbTitle?: string;
    showFooter?: boolean;
}

// Track if scripts are already loaded globally
let scriptsLoaded = false;
let scriptsLoading = false;

export default function VegefoodsLayout({
    children,
    title,
    activePage = 'home',
    breadcrumbTitle,
    showFooter = true,
}: VegefoodsLayoutProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        // Maximum loader display time - hide after 2 seconds regardless
        const maxLoaderTimeout = setTimeout(() => {
            hideLoader();
        }, 2000);

        const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = false;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load ${src}`));
                document.body.appendChild(script);
            });
        };

        const loadScriptsParallel = (scripts: string[]): Promise<void[]> => {
            return Promise.all(scripts.map(src => {
                return new Promise<void>((resolve, reject) => {
                    if (document.querySelector(`script[src="${src}"]`)) {
                        resolve();
                        return;
                    }
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = true;
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error(`Failed to load ${src}`));
                    document.body.appendChild(script);
                });
            }));
        };

        const hideLoader = () => {
            const loader = document.getElementById('ftco-loader');
            if (loader) {
                loader.classList.remove('show');
            }
        };

        const showLoader = () => {
            const loader = document.getElementById('ftco-loader');
            if (loader) {
                loader.classList.add('show');
            }
        };

        const initializePlugins = () => {
            if (typeof window.$ === 'undefined') {
                hideLoader();
                return;
            }

            const $ = window.$ as any;

            // Initialize AOS (Animate on Scroll) - matching original settings
            if (typeof (window as any).AOS !== 'undefined') {
                (window as any).AOS.init({
                    duration: 800,
                    easing: 'slide'
                });
            }

            // Initialize Owl Carousel for home slider - matching original settings
            if ($.fn.owlCarousel) {
                // Destroy existing carousels first
                if ($('.home-slider').hasClass('owl-loaded')) {
                    $('.home-slider').trigger('destroy.owl.carousel');
                }
                
                $('.home-slider').owlCarousel({
                    loop: true,
                    autoplay: true,
                    margin: 0,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    nav: false,
                    autoplayHoverPause: false,
                    items: 1,
                    navText: ["<span class='ion-md-arrow-back'></span>", "<span class='ion-chevron-right'></span>"],
                    responsive: {
                        0: { items: 1 },
                        600: { items: 1 },
                        1000: { items: 1 }
                    }
                });

                // Initialize Carousel Testimony - matching original settings
                if ($('.carousel-testimony').hasClass('owl-loaded')) {
                    $('.carousel-testimony').trigger('destroy.owl.carousel');
                }
                
                $('.carousel-testimony').owlCarousel({
                    center: true,
                    loop: true,
                    items: 1,
                    margin: 30,
                    stagePadding: 0,
                    nav: false,
                    navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
                    responsive: {
                        0: { items: 1 },
                        600: { items: 3 },
                        1000: { items: 3 }
                    }
                });
            }

            // Initialize Stellar for parallax - matching original settings
            if ($.fn.stellar) {
                $(window).stellar({
                    responsive: true,
                    parallaxBackgrounds: true,
                    parallaxElements: true,
                    horizontalScrolling: false,
                    hideDistantElements: false,
                    scrollProperty: 'scroll'
                });
            }

            // Initialize Scrollax - matching original
            if (typeof $.Scrollax !== 'undefined') {
                $.Scrollax();
            }

            // Content Waypoint for animations - matching original staggered animation
            if ($.fn.waypoint) {
                const animateElements = document.querySelectorAll('.ftco-animate');
                animateElements.forEach((element) => {
                    $(element).waypoint(function(direction: string) {
                        if (direction === 'down' && !$(element).hasClass('ftco-animated')) {
                            $(element).addClass('item-animate');
                            setTimeout(function() {
                                const itemAnimateElements = document.querySelectorAll('body .ftco-animate.item-animate');
                                itemAnimateElements.forEach((el, k) => {
                                    setTimeout(function() {
                                        const $el = $(el);
                                        const effect = $el.data('animate-effect');
                                        if (effect === 'fadeIn') {
                                            $el.addClass('fadeIn ftco-animated');
                                        } else if (effect === 'fadeInLeft') {
                                            $el.addClass('fadeInLeft ftco-animated');
                                        } else if (effect === 'fadeInRight') {
                                            $el.addClass('fadeInRight ftco-animated');
                                        } else {
                                            $el.addClass('fadeInUp ftco-animated');
                                        }
                                        $el.removeClass('item-animate');
                                    }, k * 50);
                                });
                            }, 100);
                        }
                    }, { offset: '95%' });
                });
            }

            // Counter animation - matching original 7000ms duration
            if ($.fn.animateNumber) {
                const $sectionCounter = $('#section-counter');
                if ($sectionCounter.length > 0 && $.fn.waypoint) {
                    $sectionCounter.waypoint(function(direction: string) {
                        if (direction === 'down' && !$sectionCounter.hasClass('ftco-animated')) {
                            $('.number').each(function(this: HTMLElement) {
                                const $this = $(this);
                                const num = $this.data('number');
                                if (num) {
                                    $this.animateNumber({
                                        number: num,
                                        numberStep: $.animateNumber?.numberStepFactories?.separator(',')
                                    }, 7000);
                                }
                            });
                        }
                    }, { offset: '95%' });
                } else {
                    // Fallback for pages without section-counter
                    const numberElements = document.querySelectorAll('.number:not(.counted)');
                    numberElements.forEach((el) => {
                        const $el = $(el);
                        const num = $el.data('number');
                        if (num) {
                            $el.addClass('counted');
                            $el.animateNumber({
                                number: num
                            }, 7000);
                        }
                    });
                }
            }

            // Scroll window functionality - matching original
            const scrollWindow = () => {
                $(window).on('scroll.vegefoodsNav', function() {
                    const st = $(window).scrollTop() || 0;
                    const navbar = $('.ftco_navbar');

                    if (st > 150) {
                        if (!navbar.hasClass('scrolled')) {
                            navbar.addClass('scrolled');
                        }
                    }
                    if (st < 150) {
                        if (navbar.hasClass('scrolled')) {
                            navbar.removeClass('scrolled sleep');
                        }
                    }
                    if (st > 350) {
                        if (!navbar.hasClass('awake')) {
                            navbar.addClass('awake');
                        }
                    }
                    if (st < 350) {
                        if (navbar.hasClass('awake')) {
                            navbar.removeClass('awake');
                            navbar.addClass('sleep');
                        }
                    }
                });
            };
            scrollWindow();

            // GoHere scroll functionality - slower smooth scroll (1000ms)
            $('.mouse-icon').on('click.vegefoods', function(event: Event) {
                event.preventDefault();
                const gotoHere = $('.goto-here');
                if (gotoHere.length > 0) {
                    $('html,body').animate({
                        scrollTop: gotoHere.offset()?.top || 0
                    }, 1000, 'easeInOutExpo');
                }
                return false;
            });

            // Smooth scroll for anchor links - slower timer (1000ms)
            $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click.vegefoods', function(event: Event) {
                event.preventDefault();
                const target = $(event.currentTarget as HTMLElement);
                const hash = target.attr('href');
                if (hash && hash.length > 1) {
                    const targetEl = $(hash);
                    if (targetEl.length > 0) {
                        $('html, body').animate({
                            scrollTop: targetEl.offset()?.top || 0
                        }, 1000, 'easeInOutExpo', function() {
                            window.location.hash = hash;
                        });
                    }
                }
            });

            // Magnific Popup - matching original
            if ($.fn.magnificPopup) {
                $('.image-popup').magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    mainClass: 'mfp-no-margins mfp-with-zoom',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1]
                    },
                    image: {
                        verticalFit: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300
                    }
                });

                $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }

            // Countdown timer for deal of the day - matching original format
            const makeTimer = () => {
                const daysEl = document.getElementById('days');
                const hoursEl = document.getElementById('hours');
                const minutesEl = document.getElementById('minutes');
                const secondsEl = document.getElementById('seconds');

                if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

                // Clear existing timer
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }

                // Set countdown to 3 days from now
                const endTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

                const updateTimer = () => {
                    const now = new Date().getTime();
                    const timeLeft = Math.floor((endTime - now) / 1000);

                    const days = Math.floor(timeLeft / 86400);
                    const hours = Math.floor((timeLeft - (days * 86400)) / 3600);
                    const minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
                    const seconds = Math.floor(timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60));

                    const pad = (n: number) => n < 10 ? '0' + n : String(n);

                    daysEl.innerHTML = `${days}<span>Days</span>`;
                    hoursEl.innerHTML = `${pad(hours)}<span>Hours</span>`;
                    minutesEl.innerHTML = `${pad(minutes)}<span>Minutes</span>`;
                    secondsEl.innerHTML = `${pad(seconds)}<span>Seconds</span>`;
                };

                updateTimer();
                timerRef.current = window.setInterval(updateTimer, 1000);
            };

            makeTimer();

            // Hide loader immediately (matching original 1ms timeout)
            setTimeout(hideLoader, 1);
        };

        const initScripts = async () => {
            if (scriptsLoaded) {
                // Scripts already loaded, just reinitialize plugins
                requestAnimationFrame(() => {
                    initializePlugins();
                });
                return;
            }

            if (scriptsLoading) {
                // Scripts are being loaded, wait for them
                const checkLoaded = setInterval(() => {
                    if (scriptsLoaded) {
                        clearInterval(checkLoaded);
                        requestAnimationFrame(() => {
                            initializePlugins();
                        });
                    }
                }, 50);
                return;
            }

            scriptsLoading = true;

            try {
                // Load jQuery first (required by all other scripts)
                await loadScript('/js/jquery.min.js');
                await loadScript('/js/jquery-migrate-3.0.1.min.js');

                // Load Bootstrap dependencies
                await loadScript('/js/popper.min.js');
                await loadScript('/js/bootstrap.min.js');

                // Load jQuery plugins in parallel (they all depend on jQuery but not on each other)
                await loadScriptsParallel([
                    '/js/jquery.easing.1.3.js',
                    '/js/jquery.waypoints.min.js',
                    '/js/jquery.stellar.min.js',
                    '/js/owl.carousel.min.js',
                    '/js/jquery.magnific-popup.min.js',
                    '/js/aos.js',
                    '/js/jquery.animateNumber.min.js',
                    '/js/scrollax.min.js',
                ]);

                scriptsLoaded = true;
                scriptsLoading = false;

                // Initialize plugins immediately
                requestAnimationFrame(() => {
                    initializePlugins();
                });

            } catch (error) {
                console.error('Error loading scripts:', error);
                scriptsLoading = false;
                hideLoader();
            }
        };

        initScripts();

        // Cleanup
        return () => {
            clearTimeout(maxLoaderTimeout);
            
            // Clear countdown timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            
            // Reset animations and remove event handlers for re-initialization on next mount
            if (typeof window.$ !== 'undefined') {
                const $ = window.$ as any;
                
                // Remove scroll event listener
                $(window).off('scroll.vegefoodsNav');
                
                // Remove click handlers
                $('.mouse-icon').off('click.vegefoods');
                $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").off('click.vegefoods');
                
                // Reset animation classes
                $('.ftco-animate').removeClass('ftco-animated fadeInUp fadeIn fadeInLeft fadeInRight item-animate');
                
                // Destroy carousels to prevent duplicates
                if ($.fn.owlCarousel) {
                    $('.owl-carousel').trigger('destroy.owl.carousel');
                }
            }
        };
    }, []);

    return (
        <>
            <Head title={title}>
                <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Amatic+SC:400,700&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
                <link rel="stylesheet" href="/css/animate.css" />
                <link rel="stylesheet" href="/css/owl.carousel.min.css" />
                <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
                <link rel="stylesheet" href="/css/magnific-popup.css" />
                <link rel="stylesheet" href="/css/aos.css" />
                <link rel="stylesheet" href="/css/ionicons.min.css" />
                <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
                <link rel="stylesheet" href="/css/jquery.timepicker.css" />
                <link rel="stylesheet" href="/css/flaticon.css" />
                <link rel="stylesheet" href="/css/icomoon.css" />
                <link rel="stylesheet" href="/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/css/style.css" />
            </Head>

            <div className="goto-here" ref={contentRef}>
                <VegefoodsNavigation activePage={activePage} />

                {/* Breadcrumb Hero */}
                {breadcrumbTitle && (
                    <div className="hero-wrap hero-bread" style={{ backgroundImage: 'url(/images/bg_1.jpg)' }}>
                        <div className="container">
                            <div className="row no-gutters slider-text align-items-center justify-content-center">
                                <div className="col-md-9 ftco-animate text-center">
                                    <p className="breadcrumbs">
                                        <span className="mr-2">
                                            <Link href="/">Home</Link>
                                        </span>{' '}
                                        <span>{breadcrumbTitle}</span>
                                    </p>
                                    <h1 className="mb-0 bread">{breadcrumbTitle}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {children}

                {/* Loader */}
                <div id="ftco-loader" className="show fullscreen">
                    <svg className="circular" width="48px" height="48px">
                        <circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/>
                        <circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/>
                    </svg>
                </div>

                {showFooter && (
                    <footer className="ftco-footer ftco-section">
                        <div className="container">
                            <div className="row">
                                <div className="mouse">
                                    <a href="#" className="mouse-icon">
                                        <div className="mouse-wheel">
                                            <span className="ion-ios-arrow-up"></span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md">
                                    <div className="ftco-footer-widget mb-4">
                                        <h2 className="ftco-heading-2">Smart LocalMart</h2>
                                        <p>Daily essentials from nearby shops, delivered fast to your doorstep.</p>
                                        <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                            <li className="ftco-animate">
                                                <a href="#">
                                                    <span className="icon-twitter"></span>
                                                </a>
                                            </li>
                                            <li className="ftco-animate">
                                                <a href="#">
                                                    <span className="icon-facebook"></span>
                                                </a>
                                            </li>
                                            <li className="ftco-animate">
                                                <a href="#">
                                                    <span className="icon-instagram"></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="ftco-footer-widget mb-4 ml-md-5">
                                        <h2 className="ftco-heading-2">Menu</h2>
                                        <ul className="list-unstyled">
                                            <li>
                                                <Link href="/shop" className="py-2 d-block">
                                                    Shop
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/about" className="py-2 d-block">
                                                    About
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/blog" className="py-2 d-block">
                                                    Journal
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/contact" className="py-2 d-block">
                                                    Contact Us
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="ftco-footer-widget mb-4">
                                        <h2 className="ftco-heading-2">Help</h2>
                                        <div className="d-flex">
                                            <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
                                                <li>
                                                    <a href="#" className="py-2 d-block">
                                                        Shipping Information
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="py-2 d-block">
                                                        Returns &amp; Exchange
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="py-2 d-block">
                                                        Terms &amp; Conditions
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="py-2 d-block">
                                                        Privacy Policy
                                                    </a>
                                                </li>
                                            </ul>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <a href="#" className="py-2 d-block">
                                                        FAQs
                                                    </a>
                                                </li>
                                                <li>
                                                    <Link href="/contact" className="py-2 d-block">
                                                        Contact
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="ftco-footer-widget mb-4">
                                        <h2 className="ftco-heading-2">Have a Questions?</h2>
                                        <div className="block-23 mb-3">
                                            <ul>
                                                <li>
                                                    <span className="icon icon-map-marker"></span>
                                                    <span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span className="icon icon-phone"></span>
                                                        <span className="text">+2 392 3929 210</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <span className="icon icon-envelope"></span>
                                                        <span className="text">info@yourdomain.com</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <p>
                                        Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with{' '}
                                        <i className="icon-heart color-danger" aria-hidden="true"></i> by{' '}
                                        <a href="https://colorlib.com" target="_blank" rel="noreferrer">
                                            Colorlib
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </footer>
                )}
            </div>
        </>
    );
}
