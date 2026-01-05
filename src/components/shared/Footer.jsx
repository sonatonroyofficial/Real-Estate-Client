import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content pt-10 pb-6">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand & About */}
                <div>
                    <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
                        <img src="/brandbay_logo.png" alt="BrandBay" className="h-10 w-auto bg-white rounded-lg p-1" />
                        <span className="text-2xl font-bold text-white">BrandBay</span>
                    </Link>
                    <p className="text-sm leading-relaxed opacity-80">
                        Your trusted partner in finding the perfect home. We specialize in luxury properties and exceptional client service across the globe.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary"><FaFacebookF /></a>
                        <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary"><FaTwitter /></a>
                        <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary"><FaInstagram /></a>
                        <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
                    <ul className="space-y-2 text-sm opacity-80">
                        <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
                        <li><Link to="/properties" className="hover:text-secondary transition-colors">Properties</Link></li>
                        <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-lg font-bold mb-4 text-white">Services</h3>
                    <ul className="space-y-2 text-sm opacity-80">
                        <li><a href="#" className="hover:text-secondary transition-colors">Property Management</a></li>
                        <li><a href="#" className="hover:text-secondary transition-colors">Mortgage Calculator</a></li>
                        <li><a href="#" className="hover:text-secondary transition-colors">Home Staging</a></li>
                        <li><a href="#" className="hover:text-secondary transition-colors">Legal Assistance</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
                    <ul className="space-y-4 text-sm opacity-80">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="mt-1 text-secondary" />
                            <span>1234 Luxury Lane, Beverly Hills, CA 90210</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-secondary" />
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-secondary" />
                            <span>info@brandbay.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-neutral-content/20 mt-10 pt-6 text-center text-xs opacity-60">
                <p>&copy; {new Date().getFullYear()} BrandBay Inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
