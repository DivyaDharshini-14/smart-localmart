import { Link } from '@inertiajs/react';
import VegefoodsLayout from '@/components/vegefoods-layout';

const products = [
    { id: 1, name: 'Bell Pepper', image: '/images/product-1.jpg', price: 80.00, originalPrice: 120.00, discount: 30 },
    { id: 2, name: 'Strawberry', image: '/images/product-2.jpg', price: 120.00, originalPrice: null, discount: null },
    { id: 3, name: 'Green Beans', image: '/images/product-3.jpg', price: 120.00, originalPrice: null, discount: null },
    { id: 4, name: 'Purple Cabbage', image: '/images/product-4.jpg', price: 120.00, originalPrice: null, discount: null },
    { id: 5, name: 'Tomatoe', image: '/images/product-5.jpg', price: 80.00, originalPrice: 120.00, discount: 30 },
    { id: 6, name: 'Brocolli', image: '/images/product-6.jpg', price: 120.00, originalPrice: null, discount: null },
    { id: 7, name: 'Carrots', image: '/images/product-7.jpg', price: 120.00, originalPrice: null, discount: null },
    { id: 8, name: 'Fruit Juice', image: '/images/product-8.jpg', price: 120.00, originalPrice: null, discount: null },
];

const categories = [
    { name: 'Vegetables', image: '/images/category.jpg', description: 'Protect the health of every home' },
    { name: 'Fruits', image: '/images/category-1.jpg' },
    { name: 'Vegetables', image: '/images/category-2.jpg' },
    { name: 'Juices', image: '/images/category-3.jpg' },
    { name: 'Dried', image: '/images/category-4.jpg' },
];

const testimonials = [
    { name: 'Garreth Smith', position: 'Marketing Manager', image: '/images/person_1.jpg', text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.' },
    { name: 'Garreth Smith', position: 'Interface Designer', image: '/images/person_2.jpg', text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.' },
    { name: 'Garreth Smith', position: 'UI Designer', image: '/images/person_3.jpg', text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.' },
    { name: 'Garreth Smith', position: 'Web Developer', image: '/images/person_1.jpg', text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.' },
    { name: 'Garreth Smith', position: 'System Analyst', image: '/images/person_1.jpg', text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.' },
];

export default function Landing() {
    return (
        <VegefoodsLayout title="Smart LocalMart - Daily Essentials Delivered" activePage="home">
            {/* Hero Section */}
            <section id="home-section" className="hero">
                <div className="home-slider owl-carousel">
                    <div className="slider-item" style={{ backgroundImage: 'url(/images/bg_1.jpg)' }}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text justify-content-center align-items-center">
                                <div className="col-md-12 ftco-animate text-center">
                                    <h1 className="mb-2">We serve Fresh Vegetables &amp; Fruits</h1>
                                    <h2 className="subheading mb-4">We deliver organic vegetables &amp; fruits</h2>
                                    <p><Link href="/shop" className="btn btn-primary">View Details</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-item" style={{ backgroundImage: 'url(/images/bg_2.jpg)' }}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text justify-content-center align-items-center">
                                <div className="col-sm-12 ftco-animate text-center">
                                    <h1 className="mb-2">100% Fresh &amp; Organic Foods</h1>
                                    <h2 className="subheading mb-4">We deliver organic vegetables &amp; fruits</h2>
                                    <p><Link href="/shop" className="btn btn-primary">View Details</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="ftco-section">
                <div className="container">
                    <div className="row no-gutters ftco-services">
                        <div className="col-md-3 text-center d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services mb-md-0 mb-4">
                                <div className="icon bg-color-1 active d-flex justify-content-center align-items-center mb-2">
                                    <span className="flaticon-shipped"></span>
                                </div>
                                <div className="media-body">
                                    <h3 className="heading">Free Shipping</h3>
                                    <span>On order over ₹500</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 text-center d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services mb-md-0 mb-4">
                                <div className="icon bg-color-2 d-flex justify-content-center align-items-center mb-2">
                                    <span className="flaticon-diet"></span>
                                </div>
                                <div className="media-body">
                                    <h3 className="heading">Always Fresh</h3>
                                    <span>Product well packaged</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 text-center d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services mb-md-0 mb-4">
                                <div className="icon bg-color-3 d-flex justify-content-center align-items-center mb-2">
                                    <span className="flaticon-award"></span>
                                </div>
                                <div className="media-body">
                                    <h3 className="heading">Superior Quality</h3>
                                    <span>Quality Products</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 text-center d-flex align-self-stretch ftco-animate">
                            <div className="media block-6 services mb-md-0 mb-4">
                                <div className="icon bg-color-4 d-flex justify-content-center align-items-center mb-2">
                                    <span className="flaticon-customer-service"></span>
                                </div>
                                <div className="media-body">
                                    <h3 className="heading">Support</h3>
                                    <span>24/7 Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Section */}
            <section className="ftco-section ftco-category ftco-no-pt">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-6 order-md-last align-items-stretch d-flex">
                                    <div className="category-wrap-2 ftco-animate img align-self-stretch d-flex" style={{ backgroundImage: 'url(/images/category.jpg)' }}>
                                        <div className="text text-center">
                                            <h2>Vegetables</h2>
                                            <p>Protect the health of every home</p>
                                            <p><Link href="/shop" className="btn btn-primary">Shop now</Link></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="category-wrap ftco-animate img mb-4 d-flex align-items-end" style={{ backgroundImage: 'url(/images/category-1.jpg)' }}>
                                        <div className="text px-3 py-1">
                                            <h2 className="mb-0"><Link href="/shop">Fruits</Link></h2>
                                        </div>
                                    </div>
                                    <div className="category-wrap ftco-animate img d-flex align-items-end" style={{ backgroundImage: 'url(/images/category-2.jpg)' }}>
                                        <div className="text px-3 py-1">
                                            <h2 className="mb-0"><Link href="/shop">Vegetables</Link></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="category-wrap ftco-animate img mb-4 d-flex align-items-end" style={{ backgroundImage: 'url(/images/category-3.jpg)' }}>
                                <div className="text px-3 py-1">
                                    <h2 className="mb-0"><Link href="/shop">Juices</Link></h2>
                                </div>
                            </div>
                            <div className="category-wrap ftco-animate img d-flex align-items-end" style={{ backgroundImage: 'url(/images/category-4.jpg)' }}>
                                <div className="text px-3 py-1">
                                    <h2 className="mb-0"><Link href="/shop">Dried</Link></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center mb-3 pb-3">
                        <div className="col-md-12 heading-section text-center ftco-animate">
                            <span className="subheading">Featured Products</span>
                            <h2 className="mb-4">Our Products</h2>
                            <p>Fresh vegetables and fruits from local farms, delivered to your doorstep</p>
                        </div>
                    </div>
                    <div className="row">
                        {products.map((product) => (
                            <div key={product.id} className="col-md-6 col-lg-3 ftco-animate">
                                <div className="product">
                                    <Link href="/product-single" className="img-prod">
                                        <img className="img-fluid" src={product.image} alt={product.name} />
                                        {product.discount && <span className="status">{product.discount}%</span>}
                                        <div className="overlay"></div>
                                    </Link>
                                    <div className="text py-3 pb-4 px-3 text-center">
                                        <h3>
                                            <Link href="/product-single">{product.name}</Link>
                                        </h3>
                                        <div className="d-flex">
                                            <div className="pricing">
                                                <p className="price">
                                                    {product.originalPrice && (
                                                        <span className="mr-2 price-dc">₹{product.originalPrice.toFixed(2)}</span>
                                                    )}
                                                    <span className="price-sale">₹{product.price.toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bottom-area d-flex px-3">
                                            <div className="m-auto d-flex">
                                                <a href="#" className="add-to-cart d-flex justify-content-center align-items-center text-center">
                                                    <span><i className="ion-ios-menu"></i></span>
                                                </a>
                                                <a href="#" className="buy-now d-flex justify-content-center align-items-center mx-1">
                                                    <span><i className="ion-ios-cart"></i></span>
                                                </a>
                                                <a href="#" className="heart d-flex justify-content-center align-items-center">
                                                    <span><i className="ion-ios-heart"></i></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deal of the Day Section */}
            <section className="ftco-section img" style={{ backgroundImage: 'url(/images/bg_3.jpg)' }}>
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-md-6 heading-section ftco-animate deal-of-the-day">
                            <span className="subheading">Best Price For You</span>
                            <h2 className="mb-4">Deal of the day</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
                            <h3><Link href="/shop">Spinach</Link></h3>
                            <span className="price">$10 <Link href="/shop">now $5 only</Link></span>
                            <div id="timer" className="d-flex mt-5">
                                <div className="time" id="days"></div>
                                <div className="time pl-3" id="hours"></div>
                                <div className="time pl-3" id="minutes"></div>
                                <div className="time pl-3" id="seconds"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="ftco-section testimony-section">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-3">
                        <div className="col-md-7 heading-section ftco-animate text-center">
                            <span className="subheading">Testimony</span>
                            <h2 className="mb-4">Our satisfied customer says</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
                        </div>
                    </div>
                    <div className="row ftco-animate">
                        <div className="col-md-12">
                            <div className="carousel-testimony owl-carousel">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="item">
                                        <div className="testimony-wrap p-4 pb-5">
                                            <div className="user-img mb-5" style={{ backgroundImage: `url(${testimonial.image})` }}>
                                                <span className="quote d-flex align-items-center justify-content-center">
                                                    <i className="icon-quote-left"></i>
                                                </span>
                                            </div>
                                            <div className="text text-center">
                                                <p className="mb-5 pl-4 line">{testimonial.text}</p>
                                                <p className="name">{testimonial.name}</p>
                                                <span className="position">{testimonial.position}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            {/* Partner Section */}
            <section className="ftco-section ftco-partner">
                <div className="container">
                    <div className="row">
                        <div className="col-sm ftco-animate">
                            <a href="#" className="partner"><img src="/images/partner-1.png" className="img-fluid" alt="Partner" /></a>
                        </div>
                        <div className="col-sm ftco-animate">
                            <a href="#" className="partner"><img src="/images/partner-2.png" className="img-fluid" alt="Partner" /></a>
                        </div>
                        <div className="col-sm ftco-animate">
                            <a href="#" className="partner"><img src="/images/partner-3.png" className="img-fluid" alt="Partner" /></a>
                        </div>
                        <div className="col-sm ftco-animate">
                            <a href="#" className="partner"><img src="/images/partner-4.png" className="img-fluid" alt="Partner" /></a>
                        </div>
                        <div className="col-sm ftco-animate">
                            <a href="#" className="partner"><img src="/images/partner-5.png" className="img-fluid" alt="Partner" /></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
                <div className="container py-4">
                    <div className="row d-flex justify-content-center py-5">
                        <div className="col-md-6">
                            <h2 style={{ fontSize: '22px' }} className="mb-0">Subscribe to our Newsletter</h2>
                            <span>Get e-mail updates about our latest products and special offers</span>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <form action="#" className="subscribe-form">
                                <div className="form-group d-flex">
                                    <input type="text" className="form-control" placeholder="Enter email address" />
                                    <input type="submit" value="Subscribe" className="submit px-3" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </VegefoodsLayout>
    );
}
