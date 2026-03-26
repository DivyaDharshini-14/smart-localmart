import { useEffect } from 'react';
import VegefoodsLayout from '@/components/vegefoods-layout';

declare global {
    interface Window {
        google: any;
    }
}

export default function Contact() {
    useEffect(() => {
        // Load Google Maps script if needed
        const loadGoogleMaps = () => {
            if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
                const script = document.createElement('script');
                script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false';
                script.async = true;
                script.defer = true;
                document.body.appendChild(script);

                script.onload = () => {
                    // Initialize map if needed
                    if (window.google && window.google.maps) {
                        const mapElement = document.getElementById('map');
                        if (mapElement) {
                            new window.google.maps.Map(mapElement, {
                                center: { lat: 40.7128, lng: -74.0060 },
                                zoom: 15,
                            });
                        }
                    }
                };
            }
        };

        loadGoogleMaps();
    }, []);

    return (
        <VegefoodsLayout title="Contact Us - Vegefoods" activePage="contact" breadcrumbTitle="Contact us">
            <section className="ftco-section contact-section bg-light">
                <div className="container">
                    <div className="row d-flex mb-5 contact-info">
                        <div className="w-100"></div>
                        <div className="col-md-3 d-flex">
                            <div className="info bg-white p-4">
                                <p>
                                    <span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex">
                            <div className="info bg-white p-4">
                                <p>
                                    <span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex">
                            <div className="info bg-white p-4">
                                <p>
                                    <span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex">
                            <div className="info bg-white p-4">
                                <p>
                                    <span>Website</span> <a href="#">yoursite.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row block-9">
                        <div className="col-md-6 order-md-last d-flex">
                            <form action="#" className="bg-white p-5 contact-form">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Subject" />
                                </div>
                                <div className="form-group">
                                    <textarea name="" id="" cols={30} rows={7} className="form-control" placeholder="Message"></textarea>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5" />
                                </div>
                            </form>
                        </div>

                        <div className="col-md-6 d-flex">
                            <div id="map" className="bg-white" style={{ width: '100%', height: '400px' }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </VegefoodsLayout>
    );
}

