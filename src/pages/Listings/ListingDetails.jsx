
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    MapPin, Star, Share2, Heart, CheckCircle,
    Bed, Bath, Square, Calendar, User, Shield
} from 'lucide-react';
import ListingCard from '../../components/cards/ListingCard';
import SectionTitle from '../../components/shared/SectionTitle';

// Mock Data for a single listing
const MOCK_LISTING = {
    id: 1,
    title: "Luxury Villa with Ocean View",
    price: 1200000,
    location: "Beverly Hills, CA",
    rating: 4.8,
    reviews: 124,
    description: "Experience the epitome of luxury living in this stunning villa. Featuring panoramic ocean views, a state-of-the-art kitchen, and a private infinity pool, this property is perfect for those seeking elegance and tranquility. The spacious interiors are designed with modern aesthetics, providing a seamless blend of comfort and style.",
    specs: {
        bedrooms: 5,
        bathrooms: 4,
        area: "4,500 sqft",
        built: 2021,
        type: "Villa",
        parking: "2 Spots"
    },
    features: [
        "Ocean View", "Private Pool", "Smart Home System",
        "24/7 Security", "Gym", "Home Theater"
    ],
    images: [
        "https://picsum.photos/seed/1/1200/800",
        "https://picsum.photos/seed/2/800/600",
        "https://picsum.photos/seed/3/800/600",
        "https://picsum.photos/seed/4/800/600",
        "https://picsum.photos/seed/5/800/600"
    ],
    agent: {
        name: "Sarah Johnson",
        image: "https://i.pravatar.cc/150?u=sarah",
        phone: "+1 (555) 123-4567"
    }
};

const MOCK_REVIEWS = [
    { id: 1, user: "John Doe", rating: 5, date: "Oct 12, 2023", comment: "Absolutely stunning property! The views are breathtaking." },
    { id: 2, user: "Jane Smith", rating: 4, date: "Sep 28, 2023", comment: "Great amenities and location, but the price is a bit steep." },
];

const MOCK_RELATED = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 10,
    title: ["Modern Apartment", "Cozy Cottage", "Beach House", "City Penthouse"][i],
    price: 450000 + (i * 100000),
    location: "California, USA",
    rating: 4.5,
    image: `https://picsum.photos/seed/${i + 10}/800/600`,
    category: "Luxury",
    type: "sale"
}));

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        window.scrollTo(0, 0);
        setLoading(true);
        setTimeout(() => {
            setListing(MOCK_LISTING);
            setLoading(false);
        }, 800);
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;

    return (
        <div className="min-h-screen bg-white pt-20 pb-20">
            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] rounded-3xl overflow-hidden">
                    {/* Main Image */}
                    <div className="md:col-span-2 md:row-span-2 h-full">
                        <img src={listing.images[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
                    </div>
                    {/* Side Images */}
                    {listing.images.slice(1, 5).map((img, idx) => (
                        <div key={idx} className="hidden md:block h-full overflow-hidden">
                            <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <MapPin size={18} />
                                    <span>{listing.location}</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition"><Share2 size={20} /></button>
                                <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition"><Heart size={20} /></button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 py-6 border-y border-gray-100">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Bed size={20} className="text-blue-600" />
                                <span className="font-semibold">{listing.specs.bedrooms} Beds</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Bath size={20} className="text-blue-600" />
                                <span className="font-semibold">{listing.specs.bathrooms} Baths</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Square size={20} className="text-blue-600" />
                                <span className="font-semibold">{listing.specs.area}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Calendar size={20} className="text-blue-600" />
                                <span className="font-semibold">Built {listing.specs.built}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold mb-4">About this property</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{listing.description}</p>
                    </div>

                    {/* Features (Key Specs/Rules) */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold mb-5">Key Features & Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {listing.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <CheckCircle size={18} className="text-green-500" />
                                    <span className="font-medium text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <h3 className="text-xl font-bold">Reviews</h3>
                            <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md text-blue-700 font-bold text-sm">
                                <Star size={14} className="fill-current" />
                                {listing.rating} ({listing.reviews} reviews)
                            </div>
                        </div>

                        <div className="space-y-6">
                            {MOCK_REVIEWS.map(review => (
                                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                                {review.user[0]}
                                            </div>
                                            <span className="font-bold text-gray-900">{review.user}</span>
                                        </div>
                                        <span className="text-sm text-gray-400">{review.date}</span>
                                    </div>
                                    <p className="text-gray-600 ml-12">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <div className="mb-6">
                            <span className="text-sm text-gray-500 font-medium">Price</span>
                            <div className="text-3xl font-bold text-blue-600">
                                ${listing.price.toLocaleString()}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                            <img src={listing.agent.image} alt="Agent" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-bold text-gray-900">{listing.agent.name}</p>
                                <p className="text-sm text-gray-500">Property Agent</p>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition mb-3">
                            Schedule a Tour
                        </button>
                        <button className="w-full bg-white text-gray-700 border border-gray-200 font-bold py-3 rounded-xl hover:bg-gray-50 transition">
                            Contact Agent
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Items */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 border-t border-gray-200 mt-10">
                <SectionTitle title="Similar Properties" align="left" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_RELATED.map(item => (
                        <ListingCard key={item.id} listing={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListingDetails;
