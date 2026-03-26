import { Link } from '@inertiajs/react';
import VegefoodsLayout from '@/components/vegefoods-layout';

const blogPosts = [
    { id: 1, image: '/images/image_1.jpg', date: 'July 20, 2019', author: 'Admin', comments: 3 },
    { id: 2, image: '/images/image_2.jpg', date: 'July 20, 2019', author: 'Admin', comments: 3 },
    { id: 3, image: '/images/image_3.jpg', date: 'July 20, 2019', author: 'Admin', comments: 3 },
    { id: 4, image: '/images/image_4.jpg', date: 'July 20, 2019', author: 'Admin', comments: 3 },
    { id: 5, image: '/images/image_5.jpg', date: 'July 20, 2019', author: 'Admin', comments: 3 },
    { id: 6, image: '/images/image_6.jpg', date: 'July 20, 2019', author: 'Admin', comments: 3 },
];

export default function Blog() {
    return (
        <VegefoodsLayout title="Blog - Vegefoods" activePage="blog" breadcrumbTitle="Blog">
            <section className="ftco-section ftco-degree-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 ftco-animate">
                            <div className="row">
                                {blogPosts.map((post) => (
                                    <div key={post.id} className="col-md-12 d-flex ftco-animate">
                                        <div className="blog-entry align-self-stretch d-md-flex">
                                            <a href="blog-single.html" className="block-20" style={{ backgroundImage: `url(${post.image})` }}></a>
                                            <div className="text d-block pl-md-4">
                                                <div className="meta mb-3">
                                                    <div>
                                                        <a href="#">{post.date}</a>
                                                    </div>
                                                    <div>
                                                        <a href="#">{post.author}</a>
                                                    </div>
                                                    <div>
                                                        <a href="#" className="meta-chat">
                                                            <span className="icon-chat"></span> {post.comments}
                                                        </a>
                                                    </div>
                                                </div>
                                                <h3 className="heading">
                                                    <a href="#">Even the all-powerful Pointing has no control about the blind texts</a>
                                                </h3>
                                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                                <p>
                                                    <Link href="/blog-single" className="btn btn-primary py-2 px-3">
                                                        Read more
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-4 sidebar ftco-animate">
                            <div className="sidebar-box">
                                <form action="#" className="search-form">
                                    <div className="form-group">
                                        <span className="icon ion-ios-search"></span>
                                        <input type="text" className="form-control" placeholder="Type a keyword and hit enter" />
                                    </div>
                                </form>
                            </div>
                            <div className="sidebar-box ftco-animate">
                                <h3 className="heading">Categories</h3>
                                <ul className="categories">
                                    <li>
                                        <a href="#">Vegetables <span>(12)</span></a>
                                    </li>
                                    <li>
                                        <a href="#">Fruits <span>(22)</span></a>
                                    </li>
                                    <li>
                                        <a href="#">Juice <span>(37)</span></a>
                                    </li>
                                    <li>
                                        <a href="#">Dried <span>(42)</span></a>
                                    </li>
                                </ul>
                            </div>

                            <div className="sidebar-box ftco-animate">
                                <h3 className="heading">Recent Blog</h3>
                                <div className="block-21 mb-4 d-flex">
                                    <a className="blog-img mr-4" style={{ backgroundImage: 'url(/images/image_1.jpg)' }}></a>
                                    <div className="text">
                                        <h3 className="heading-1">
                                            <a href="#">Even the all-powerful Pointing has no control about the blind texts</a>
                                        </h3>
                                        <div className="meta">
                                            <div>
                                                <a href="#">
                                                    <span className="icon-calendar"></span> April 09, 2019
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <span className="icon-person"></span> Admin
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <span className="icon-chat"></span> 19
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="block-21 mb-4 d-flex">
                                    <a className="blog-img mr-4" style={{ backgroundImage: 'url(/images/image_2.jpg)' }}></a>
                                    <div className="text">
                                        <h3 className="heading-1">
                                            <a href="#">Even the all-powerful Pointing has no control about the blind texts</a>
                                        </h3>
                                        <div className="meta">
                                            <div>
                                                <a href="#">
                                                    <span className="icon-calendar"></span> April 09, 2019
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <span className="icon-person"></span> Admin
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <span className="icon-chat"></span> 19
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="block-21 mb-4 d-flex">
                                    <a className="blog-img mr-4" style={{ backgroundImage: 'url(/images/image_3.jpg)' }}></a>
                                    <div className="text">
                                        <h3 className="heading-1">
                                            <a href="#">Even the all-powerful Pointing has no control about the blind texts</a>
                                        </h3>
                                        <div className="meta">
                                            <div>
                                                <a href="#">
                                                    <span className="icon-calendar"></span> April 09, 2019
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <span className="icon-person"></span> Admin
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <span className="icon-chat"></span> 19
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-box ftco-animate">
                                <h3 className="heading">Tag Cloud</h3>
                                <div className="tagcloud">
                                    <a href="#" className="tag-cloud-link">dish</a>
                                    <a href="#" className="tag-cloud-link">menu</a>
                                    <a href="#" className="tag-cloud-link">food</a>
                                    <a href="#" className="tag-cloud-link">sweet</a>
                                    <a href="#" className="tag-cloud-link">tasty</a>
                                    <a href="#" className="tag-cloud-link">delicious</a>
                                    <a href="#" className="tag-cloud-link">desserts</a>
                                    <a href="#" className="tag-cloud-link">drinks</a>
                                </div>
                            </div>

                            <div className="sidebar-box ftco-animate">
                                <h3 className="heading">Paragraph</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </VegefoodsLayout>
    );
}

