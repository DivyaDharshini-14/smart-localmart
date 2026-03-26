import { Link } from '@inertiajs/react';
import { useState } from 'react';
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
    { id: 9, name: 'Onion', image: '/images/product-9.jpg', price: 80.00, originalPrice: 120.00, discount: 30 },
    { id: 10, name: 'Apple', image: '/images/product-10.jpg', price: 120.00, originalPrice: null, discount: null },
    { id: 11, name: 'Garlic', image: '/images/product-11.jpg', price: 120.00, originalPrice: null, discount: null },
    { id: 12, name: 'Chilli', image: '/images/product-12.jpg', price: 120.00, originalPrice: null, discount: null },
];

export default function Shop() {
    const [activeCategory, setActiveCategory] = useState('All');

    return (
        <VegefoodsLayout title="Shop - Vegefoods" activePage="shop" breadcrumbTitle="Products">
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 mb-5 text-center">
                            <ul className="product-category">
                                <li>
                                    <a href="#" className={activeCategory === 'All' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveCategory('All'); }}>
                                        All
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={activeCategory === 'Vegetables' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveCategory('Vegetables'); }}>
                                        Vegetables
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={activeCategory === 'Fruits' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveCategory('Fruits'); }}>
                                        Fruits
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={activeCategory === 'Juice' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveCategory('Juice'); }}>
                                        Juice
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className={activeCategory === 'Dried' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveCategory('Dried'); }}>
                                        Dried
                                    </a>
                                </li>
                            </ul>
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
                                                        <span className="mr-2 price-dc">${product.originalPrice.toFixed(2)}</span>
                                                    )}
                                                    <span className="price-sale">${product.price.toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bottom-area d-flex px-3">
                                            <div className="m-auto d-flex">
                                                <a href="#" className="add-to-cart d-flex justify-content-center align-items-center text-center">
                                                    <span>
                                                        <i className="ion-ios-menu"></i>
                                                    </span>
                                                </a>
                                                <a href="#" className="buy-now d-flex justify-content-center align-items-center mx-1">
                                                    <span>
                                                        <i className="ion-ios-cart"></i>
                                                    </span>
                                                </a>
                                                <a href="#" className="heart d-flex justify-content-center align-items-center ">
                                                    <span>
                                                        <i className="ion-ios-heart"></i>
                                                    </span>
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
        </VegefoodsLayout>
    );
}

