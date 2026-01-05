
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../components/home/HeroSection';
import SectionTitle from '../../components/shared/SectionTitle';
import { Home as HomeIcon, ShieldCheck, Banknote, Quote, Star } from 'lucide-react';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [popularListings, setPopularListings] = useState([]);

    useEffect(() => {
        // Fetch Categories
        fetch('http://localhost:5000/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to load categories", err));

        // Fetch Listings (and take only first 3 for popular section)
        fetch('http://localhost:5000/api/listings')
            .then(res => res.json())
            .then(data => setPopularListings(data.slice(0, 3)))
            .catch(err => console.error("Failed to load listings", err));
    }, []);

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
                            {
                                icon: <HomeIcon size={32} className="text-blue-600" />,
                                title: "Wide Range of Properties",
                                desc: "Explore a vast portfolio of exclusive listings tailored to your lifestyle, from cozy cottages to luxury estates.",
                                bg: "bg-blue-50"
                            },
                            {
                                icon: <ShieldCheck size={32} className="text-emerald-600" />,
                                title: "Trusted by Thousands",
                                desc: "With over 10 years of experience, we've helped thousands find their perfect home with transparency and trust.",
                                bg: "bg-emerald-50"
                            },
                            {
                                icon: <Banknote size={32} className="text-purple-600" />,
                                title: "Financing Made Easy",
                                desc: "Our financial experts guide you through mortgage options to secure the best rates for your investment.",
                                bg: "bg-purple-50"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className={`w-16 h-16 rounded-2xl ${item.bg} mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Top Categories */}
                <section>
                    <SectionTitle title="Explore by Category" subtitle="Find Your Niche" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <Link to="/properties" key={cat.id} className="h-40 relative rounded-xl overflow-hidden group cursor-pointer shadow-md block">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                        <span className="text-white text-xl font-bold drop-shadow-md tracking-wide">{cat.name}</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            // Fallback Skeleton
                            [1, 2, 3, 4].map(n => <div key={n} className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>)
                        )}
                    </div>
                </section>

                {/* 4. Popular Listings */}
                <section>
                    <SectionTitle title="Popular Listings" subtitle="Trending Now" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularListings.length > 0 ? (
                            popularListings.map((item) => (
                                <div key={item._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                    <figure className="h-56 overflow-hidden">
                                        <img
                                            src={item.image || (item.images && item.images[0])}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <div className="flex justify-between items-start">
                                            <h2 className="card-title text-lg font-bold line-clamp-1">{item.title}</h2>
                                            <div className="badge badge-secondary badge-outline text-xs">{item.category}</div>
                                        </div>
                                        <p className="font-semibold text-primary text-xl">
                                            ${item.price.toLocaleString()}
                                            <span className="text-xs text-gray-400 font-normal ml-1">
                                                {item.type === 'rent' ? '/mo' : ''}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <span className="truncate">{item.location}</span>
                                        </p>
                                        <div className="card-actions justify-end mt-4">
                                            <Link to={`/listing/${item._id}`} className="btn btn-primary btn-sm w-full">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Fallback Skeleton
                            [1, 2, 3].map(n => (
                                <div key={n} className="card bg-base-100 shadow-xl h-96">
                                    <div className="h-48 bg-gray-200 animate-pulse rounded-t-2xl"></div>
                                    <div className="p-6 space-y-4">
                                        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                                    </div>
                                </div>
                            ))
                        )}
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
                    <SectionTitle title="Client Stories" subtitle="What People Say" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Jenkins",
                                role: "Homeowner",
                                image: "/images/client_sarah.png",
                                text: "Found my dream home in less than a week! The team was incredibly helpful and understood exactly what I was looking for.",
                                rating: 5
                            },
                            {
                                name: "Michael Ross",
                                role: "Property Investor",
                                image: "/images/client_michael.png",
                                text: "Professional, transparent, and efficient. The detailed market analytics helped me make a wise investment decision.",
                                rating: 5
                            },
                            {
                                name: "Emily Gilmore",
                                role: "Villa Owner",
                                image: "/images/client_emily.png",
                                text: "Selling my property was seamless. They handled everything from staging to the final paperwork with absolute professionalism.",
                                rating: 4
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative hover:shadow-xl transition-shadow">
                                <Quote className="absolute top-8 right-8 text-blue-100 rotate-180" size={48} />
                                <div className="flex gap-1 mb-6">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={16} className={`${i < item.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-8 leading-relaxed italic relative z-10">"{item.text}"</p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. Blog Highlights */}
                <section>
                    <SectionTitle title="Market Insights" subtitle="Latest News" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                image: "/images/blog_market_trends.png",
                                category: "Trends",
                                date: "Jan 10, 2024",
                                title: "Real Estate Market Trends 2024",
                                desc: "An in-depth analysis of the upcoming shifts in the global real estate market and what it means for investors."
                            },
                            {
                                image: "/images/blog_eco_living.png",
                                category: "Sustainability",
                                date: "Jan 08, 2024",
                                title: "The Rise of Eco-Friendly Homes",
                                desc: "Why sustainable living is not just a trend but the future of modern housing architecture."
                            },
                            {
                                image: "/images/blog_interior_design.png",
                                category: "Design",
                                date: "Jan 05, 2024",
                                title: "Top Interior Design Styles",
                                desc: "Discover the latest interior design themes that are transforming living spaces this year."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
                                <div className="h-60 overflow-hidden relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 border border-white/50 shadow-sm">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">{item.date}</div>
                                    <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow opacity-80 line-clamp-3">
                                        {item.desc}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:underline">
                                        Read Article
                                    </div>
                                </div>
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
                    <Link to="/properties" className="btn btn-primary btn-lg">Get Started Now</Link>
                </section>

            </div>
        </div>
    );
};

export default Home;
