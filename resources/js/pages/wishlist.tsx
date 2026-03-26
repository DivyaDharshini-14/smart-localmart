import VegefoodsLayout from '@/components/vegefoods-layout';

const wishlistItems = [
    { id: 1, name: 'Bell Pepper', image: '/images/product-1.jpg', price: 80.00, originalPrice: 120.00 },
    { id: 2, name: 'Strawberry', image: '/images/product-2.jpg', price: 120.00, originalPrice: null },
    { id: 3, name: 'Green Beans', image: '/images/product-3.jpg', price: 120.00, originalPrice: null },
];

export default function Wishlist() {
    return (
        <VegefoodsLayout title="Wishlist - Vegefoods" activePage="shop" breadcrumbTitle="My Wishlist">
            <section className="ftco-section ftco-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ftco-animate">
                            <div className="cart-list">
                                <table className="table">
                                    <thead className="thead-primary">
                                        <tr className="text-center">
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                            <th>Product name</th>
                                            <th>Price</th>
                                            <th>Add to Cart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishlistItems.map((item) => (
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
                                                </td>

                                                <td className="price">
                                                    {item.originalPrice && <span className="mr-2 price-dc">${item.originalPrice.toFixed(2)}</span>}
                                                    <span>${item.price.toFixed(2)}</span>
                                                </td>

                                                <td>
                                                    <a href="#" className="btn btn-primary">
                                                        Add to Cart
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </VegefoodsLayout>
    );
}

