import React from 'react';
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-primary mb-4">Get in Touch</h1>
                    <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                        We'd love to hear from you. Whether you have a question about our services, pricing, or just want to say hello, our team is ready to answer all your questions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="flex flex-col justify-between space-y-8">
                        <div className="card bg-base-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                            <div className="card-body p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>

                                <h2 className="card-title text-2xl mb-6">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Our Location</h3>
                                            <p className="text-base-content/70">123 Business Avenue, Tech Hub<br />Dhaka, Bangladesh 1212</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Email Us</h3>
                                            <p className="text-base-content/70">hello@brandbay.com<br />support@brandbay.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Call Us</h3>
                                            <p className="text-base-content/70">+880 1234 567 890<br />+880 9876 543 210</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links & Map Helper */}
                        <div className="card bg-primary text-primary-content shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title mb-4">Connect With Us</h2>
                                <p className="mb-6">Follow us on social media for the latest updates and news.</p>
                                <div className="flex space-x-4">
                                    <a href="#" className="btn btn-circle btn-ghost bg-white/20 hover:bg-white/30 border-none text-white">
                                        <Facebook size={20} />
                                    </a>
                                    <a href="#" className="btn btn-circle btn-ghost bg-white/20 hover:bg-white/30 border-none text-white">
                                        <Twitter size={20} />
                                    </a>
                                    <a href="#" className="btn btn-circle btn-ghost bg-white/20 hover:bg-white/30 border-none text-white">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className="btn btn-circle btn-ghost bg-white/20 hover:bg-white/30 border-none text-white">
                                        <Linkedin size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-8">
                            <h2 className="card-title text-2xl mb-6">Send us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Full Name</span>
                                        </label>
                                        <input type="text" placeholder="John Doe" className="input input-bordered focus:input-primary w-full bg-base-200/50" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Email Address</span>
                                        </label>
                                        <input type="email" placeholder="john@example.com" className="input input-bordered focus:input-primary w-full bg-base-200/50" />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Subject</span>
                                    </label>
                                    <select className="select select-bordered focus:select-primary w-full bg-base-200/50">
                                        <option disabled selected>Select a topic</option>
                                        <option>General Inquiry</option>
                                        <option>Support</option>
                                        <option>Feedback</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Message</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered focus:textarea-primary h-32 w-full bg-base-200/50" placeholder="How can we help you?"></textarea>
                                </div>

                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary w-full group">
                                        Send Message
                                        <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
