import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import SectionTitle from '../../components/shared/SectionTitle';

const Home = () => {
    return (
        <div className="pb-20">
            {/* 1. Hero Section */}
            <HeroSection />

            {/* Spacer for the overlapping search bar */}
            <div className="h-20 mb-12 hidden md:block"></div>
            <div className="h-10 md:hidden"></div>

            <div className="container mx-auto px-4 space-y-24">

                {/* 2. Features / Why Choose Us */}
                <section>
                    <SectionTitle title="Why Choose Us" subtitle="Our Promise" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { title: "Wide Range of Properties", desc: "Access to thousands of exclusive listings." },
                            { title: "Trusted by Thousands", desc: "Over 10 years of experience in the market." },
                            { title: "Financing Made Easy", desc: "We help you find the best mortgage rates." }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 bg-base-200 rounded-xl hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="opacity-80">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Top Categories */}
                <section>
                    <SectionTitle title="Explore by Category" subtitle="Find Your Niche" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Placeholders for Categories */}
                        {['Apartments', 'Villas', 'Offices', 'Condos'].map((cat, idx) => (
                            <div key={idx} className="h-40 bg-gray-300 rounded-xl flex items-center justify-center text-xl font-bold relative overflow-hidden group cursor-pointer">
                                <span className="z-10 text-white drop-shadow-md">{cat}</span>
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Popular Listings */}
                <section>
                    <SectionTitle title="Popular Listings" subtitle="Trending Now" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card Placeholders */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="card bg-base-100 shadow-xl">
                                <figure><img src={`https://images.unsplash.com/photo-156${item}04324-f25a5e3e57d8?w=500&auto=format&fit=crop&q=60`} alt="House" className="h-48 w-full object-cover" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Modern Home {item}</h2>
                                    <p>Description of the property goes here.</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary btn-sm">View Details</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Statistics */}
                <section className="bg-primary text-primary-content p-10 rounded-3xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold">1200+</div>
                            <div className="text-sm opacity-80">Premium Listings</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">4500+</div>
                            <div className="text-sm opacity-80">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">100+</div>
                            <div className="text-sm opacity-80">Awards Won</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">24/7</div>
                            <div className="text-sm opacity-80">Support Available</div>
                        </div>
                    </div>
                </section>

                {/* 6. Testimonials */}
                <section>
                    <SectionTitle title="Client Stories" subtitle="Testimonials" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-base-200 p-6 rounded-xl relative">
                            <p className="italic mb-4">"Found my dream home in less than a week! The team was incredibly helpful."</p>
                            <div className="font-bold">- Sarah J.</div>
                        </div>
                        <div className="bg-base-200 p-6 rounded-xl relative">
                            <p className="italic mb-4">"Professional, transparent, and efficient. detailed analytics helped me invest wisely."</p>
                            <div className="font-bold">- Michael R.</div>
                        </div>
                    </div>
                </section>

                {/* 7. Blog Highlights */}
                <section>
                    <SectionTitle title="Market Insights" subtitle="Latest News" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="h-48 bg-gray-300 rounded-xl"></div>
                                <h4 className="font-bold text-lg">Real Estate Trends 2024</h4>
                                <p className="text-sm opacity-70">Read more about the upcoming market shifts...</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 8. Newsletter */}
                <section className="bg-neutral text-neutral-content p-12 rounded-3xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <p className="mb-8 max-w-2xl mx-auto opacity-80">Get the latest property listings, market news, and exclusive offers delivered straight to your inbox.</p>
                    <div className="join">
                        <input className="input input-bordered join-item text-base-content" placeholder="Email@example.com" />
                        <button className="btn btn-primary join-item">Subscribe</button>
                    </div>
                </section>

                {/* 9. FAQ Section */}
                <section>
                    <SectionTitle title="Frequently Asked Questions" subtitle="FAQ" />
                    <div className="join join-vertical w-full">
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" defaultChecked />
                            <div className="collapse-title text-xl font-medium">How do I schedule a viewing?</div>
                            <div className="collapse-content">
                                <p>Simply go to the property page and click on 'Schedule Tour'.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">What are the fees involved?</div>
                            <div className="collapse-content">
                                <p>We are transparent with our fees. Standard commission dates apply.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 10. Final CTA */}
                <section className="text-center py-10">
                    <h2 className="text-4xl font-bold mb-6">Ready to Find Your Home?</h2>
                    <button className="btn btn-primary btn-lg">Get Started Now</button>
                </section>

            </div>
        </div>
    );
};

export default Home;
