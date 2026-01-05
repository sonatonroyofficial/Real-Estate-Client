
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, Star, Share2, Heart, CheckCircle,
    Bed, Bath, Square, Calendar, User, Shield
} from 'lucide-react';
import ListingCard from '../../components/cards/ListingCard';
import SectionTitle from '../../components/shared/SectionTitle';
import { useAuth } from '../../providers/AuthProvider';

const MOCK_REVIEWS = [
    { id: 1, user: "John Doe", rating: 5, date: "Oct 12, 2023", comment: "Absolutely stunning property! The views are breathtaking." },
    { id: 2, user: "Jane Smith", rating: 4, date: "Sep 28, 2023", comment: "Great amenities and location, but the price is a bit steep." },
];

const ListingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [relatedListings, setRelatedListings] = useState([]);

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingNote, setBookingNote] = useState('I am interested in this property. Please contact me.');

    const openBookingModal = () => {
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }
        setIsBookingModalOpen(true);
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setBookingLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    listingId: listing._id,
                    email: user.email,
                    name: user.displayName,
                    notes: bookingNote
                })
            });

            if (response.ok) {
                // alert("Booking requested successfully! Check your dashboard."); // Replaced with UI feedback
                navigate('/dashboard/bookings');
            } else {
                alert("Failed to request booking.");
            }
        } catch (error) {
            console.error("Booking failed", error);
        } finally {
            setBookingLoading(false);
            setIsBookingModalOpen(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        // Fetch Main Listing
        fetch(`http://localhost:5000/api/listings/${id}`)
            .then(res => res.json())
            .then(data => {
                // Handle Agent Data (could be object or string)
                let agentData = { name: 'Unknown', image: 'https://ui-avatars.com/api/?name=Agent' };
                if (typeof data.agent === 'string') {
                    agentData = { name: data.agent, image: `https://ui-avatars.com/api/?name=${data.agent}` };
                } else if (data.agent && typeof data.agent === 'object') {
                    agentData = data.agent;
                }

                // Handle Images (could be array or single string)
                const images = data.images && data.images.length > 0
                    ? data.images
                    : (data.image ? [data.image] : ['https://placehold.co/600x400']);

                // Create additional mock images if we only have 1 (for gallery view)
                if (images.length === 1) {
                    images.push(images[0], images[0], images[0], images[0]);
                }

                const formattedData = {
                    ...data,
                    images: images,
                    specs: {
                        bedrooms: data.features?.bedrooms || 0,
                        bathrooms: data.features?.bathrooms || 0,
                        area: `${data.features?.sqft || 0} sqft`,
                        built: data.date ? new Date(data.date).getFullYear() : (data.createdAt ? new Date(data.createdAt).getFullYear() : 'N/A'),
                        type: data.category,
                        parking: data.features?.parking ? 'Yes' : 'No'
                    },
                    agent: agentData,
                    features: [
                        data.features?.parking ? 'Parking' : null,
                        data.features?.furnished ? 'Furnished' : null,
                        'Great View', 'Security',
                        data.category
                    ].filter(Boolean)
                };
                setListing(formattedData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load listing", err);
                setLoading(false);
            });

        // Fetch Related Listings
        fetch('http://localhost:5000/api/listings')
            .then(res => res.json())
            .then(data => {
                const related = data
                    .filter(item => item._id !== id)
                    .slice(0, 4)
                    .map(item => ({
                        ...item,
                        image: item.image || (item.images && item.images[0]) || 'https://placehold.co/600x400'
                    }));
                setRelatedListings(related);
            })
            .catch(err => console.error("Failed to load related", err));

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

                        <button
                            onClick={openBookingModal}
                            disabled={bookingLoading}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition mb-3 disabled:opacity-50"
                        >
                            {bookingLoading ? 'Processing...' : 'Request Booking'}
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
                    {relatedListings.map(item => (
                        <ListingCard key={item._id} listing={item} />
                    ))}
                </div>
            </div>
            {/* Booking Modal */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Request Booking</h3>
                            <button onClick={() => setIsBookingModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <span className="sr-only">Close</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <form onSubmit={handleBooking}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">My Note</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition resize-none h-32"
                                    value={bookingNote}
                                    onChange={(e) => setBookingNote(e.target.value)}
                                    placeholder="I'd like to schedule a viewing..."
                                ></textarea>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsBookingModalOpen(false)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={bookingLoading}
                                    className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {bookingLoading ? 'Sending...' : 'Confirm Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingDetails;
