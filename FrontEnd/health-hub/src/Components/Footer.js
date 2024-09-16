import React from "react";

import { FaEnvelope, FaFacebook, FaHome, FaInstagram, FaPhone, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <>
            <footer className="text-center text-lg-start text-white bg-primary">
                <div className="container p-4 pb-0">
                    <section>
                        <div className="row">
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">
                                    Health-Hub
                                </h6>
                                <p>
                                    We provides different types of booking for health, fitness and wellness related services. Based on time slote you can visit There.
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Catagories</h6>
                                <p className="text-white">Health</p>
                                <p className="text-white">Fitness</p>
                                <p className="text-white">Wellness</p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />
                            <div className="col-md-4 col-lg-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Contacts</h6>
                                <p><FaHome size={24} /> &nbsp;&nbsp;Vijaywada, India - 520001</p>
                                <p><FaEnvelope /> &nbsp;&nbsp;info@healthub.com</p>
                                <p><FaPhone /> &nbsp;&nbsp;+91 9876543210</p>
                            </div>
                        </div>
                    </section>
                    <hr className="my-3" />
                    <section>
                        <div className="row d-flex align-items-center">
                            <div className="col-md-5 text-center text-md-start">
                                <div className="p-3">
                                    &copy; 2024 Health-Hub
                                </div>
                            </div>
                            <div className="col-md-5 text-center text-md-end">
                                <a className="btn btn-outline-light btn-floating m-1" href="http://instagram.com"><FaInstagram /></a>
                                <a className="btn btn-outline-light btn-floating m-1" href="http://facebook.com"><FaFacebook /></a>
                                <a className="btn btn-outline-light btn-floating m-1" href="http://youtube.com"><FaYoutube /></a>



                            </div>
                        </div>
                    </section>
                </div>
            </footer>
        </>
    )
}

export default Footer;