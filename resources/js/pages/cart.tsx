import { Link } from '@inertiajs/react';
import VegefoodsLayout from '@/components/vegefoods-layout';

const cartItems = [
    { id: 1, name: 'Bell Pepper', image: '/images/product-1.jpg', price: 4.90, quantity: 1 },
    { id: 2, name: 'Bell Pepper', image: '/images/product-2.jpg', price: 15.70, quantity: 1 },
    { id: 3, name: 'Bell Pepper', image: '/images/product-3.jpg', price: 15.70, quantity: 1 },
    { id: 4, name: 'Bell Pepper', image: '/images/product-4.jpg', price: 15.70, quantity: 1 },
    { id: 5, name: 'Bell Pepper', image: '/images/product-5.jpg', price: 15.70, quantity: 1 },
    { id: 6, name: 'Bell Pepper', image: '/images/product-6.jpg', price: 15.70, quantity: 1 },
];

export default function Cart() {
    return (
        <VegefoodsLayout title="Cart - Vegefoods" activePage="shop" breadcrumbTitle="My Cart">
            <section className="ftco-section ftco-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ftco-animate">
                            <div className="cart-list">
                                <table className="table">
                                    <thead className="thead-primary">
                                        <tr className="text-center">
                                            <th>&nbsp;</th>
                                            <th>Product List</th>
                                            <th>&nbsp;</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id} className="text-center">
                                                <td className="product-remove">
                                                    <a href="#">
                                                        <span className="ion-ios-close"></span>
                                                    </a>
                                                </td>

                                                <td className="image-prod">
                                                    <div className="img" style={{ backgroundImage: `url(${item.image})` }}></div>
                                                </td>

                                                <td className="product-name">
                                                    <h3>{item.name}</h3>
                                                    <p>Far far away, behind the word mountains, far from the countries</p>
                                                </td>

                                                <td className="price">${item.price.toFixed(2)}</td>

                                                <td className="quantity">
                                                    <div className="input-group mb-3">
                                                        <input
                                                            type="text"
                                                            name="quantity"
                                                            className="quantity form-control input-number"
                                                            defaultValue="1"
                                                            min="1"
                                                            max="100"
                                                        />
                                                    </div>
                                                </td>

                                                <td className="total">${item.price.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-lg-4 mt-5 cart-wrap ftco-animate">
                            <div className="cart-total mb-3">
                                <h3>Coupon Code</h3>
                                <p>Enter your coupon code if you have one</p>
                                <form action="#" className="info">
                                    <div className="form-group">
                                        <label htmlFor="">Coupon code</label>
                                        <input type="text" className="form-control text-left px-3" placeholder="" />
                                    </div>
                                </form>
                            </div>
                            <p>
                                <Link href="/checkout" className="btn btn-primary py-3 px-4">
                                    Apply Coupon
                                </Link>
                            </p>
                        </div>
                        <div className="col-lg-4 mt-5 cart-wrap ftco-animate">
                            <div className="cart-total mb-3">
                                <h3>Estimate shipping and tax</h3>
                                <p>Enter your destination to get a shipping estimate</p>
                                <form action="#" className="info">
                                    <div className="form-group">
                                        <label htmlFor="">Country</label>
                                        <input type="text" className="form-control text-left px-3" placeholder="" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">State/Province</label>
                                        <input type="text" className="form-control text-left px-3" placeholder="" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">Zip/Postal Code</label>
                                        <input type="text" className="form-control text-left px-3" placeholder="" />
                                    </div>
                                </form>
                            </div>
                            <p>
                                <Link href="/checkout" className="btn btn-primary py-3 px-4">
                                    Estimate
                                </Link>
                            </p>
                        </div>
                        <div className="col-lg-4 mt-5 cart-wrap ftco-animate">
                            <div className="cart-total mb-3">
                                <h3>Cart Totals</h3>
                                <p className="d-flex">
                                    <span>Subtotal</span>
                                    <span>$20.60</span>
                                </p>
                                <p className="d-flex">
                                    <span>Delivery</span>
                                    <span>$0.00</span>
                                </p>
                                <p className="d-flex">
                                    <span>Discount</span>
                                    <span>$3.00</span>
                                </p>
                                <hr />
                                <p className="d-flex total-price">
                                    <span>Total</span>
                                    <span>$17.60</span>
                                </p>
                            </div>
                            <p>
                                <Link href="/checkout" className="btn btn-primary py-3 px-4">
                                    Proceed to Checkout
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </VegefoodsLayout>
    );
}

