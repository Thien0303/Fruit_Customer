import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <footer
            className="text-center text-lg-start text-black"
            style={{ backgroundColor: '#ffffff' }}
        >
            <div className="container pb-5">
                <section style={{ borderBottom: '1px solid #000000' }} className="py-5">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="mb-4" style={{ color: '#6cc51d', fontSize: '25px', fontWeight: 'bold' }}>
                                Fruit Season
                            </h6>
                            <p>Welcome to the vibrant world of fruit season, where nature's bounty brings forth a symphony of flavors and colors! Join us as we celebrate the succulent sweetness and refreshing tang of seasonal fruits
                            </p>
                        </div>

                        <hr className="w-100 d-md-none" />
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                            <p>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }}>Home</Link>
                            </p>
                            <p>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }}>Cart</Link>
                            </p>
                            <p>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }}>About</Link>
                            </p>
                            <p>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }}>Contact</Link>
                            </p>
                        </div>
                        <hr className="w-100 d-md-none" />
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">
                                Useful links
                            </h6>
                            <p>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }}>Returns</Link>
                            </p>
                            <p>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }}>Shipping Policy</Link>
                            </p>
                            <p>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }}>Privacy Policy</Link>
                            </p>
                            <p>
                                <Link style={{ color: 'inherit', textDecoration: 'inherit' }}>Term of Service</Link>
                            </p>
                        </div>
                        <hr className="w-100 d-md-none" />
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p><i className="fas mr-3"></i> New York, NY 10012, US</p>
                            <p><i className="fas mr-3"></i> info@gmail.com</p>
                        </div>
                    </div>
                </section>
                <section className="p-3 pt-0">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-7 col-lg-8 text-center text-md-start">
                            <div className="p-3">
                                © 2020 Copyright
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    )
}
