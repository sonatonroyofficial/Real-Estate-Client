import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Trash2, ExternalLink } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/shared/SectionTitle';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = () => {
        setLoading(true);
        fetch(`http://localhost:5000/api/bookings?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch bookings", err);
                setLoading(false);
            });
    };

    const handleCancelBooking = (id) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' })
                .then(() => {
                    setBookings(bookings.filter(b => b._id !== id));
                })
                .catch(err => console.error(err));
        }
    };

    if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

    return (
        <div className="animate-fade-in-up">
            <SectionTitle title="My Bookings" subtitle="Manage your property interests" align="left" />

            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 mt-6">
                    {bookings.map(booking => (
                        <div key={booking._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start md:items-center">
                            {/* Listing Image */}
                            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                <img
                                    src={booking.listing?.images?.[0] || 'https://placehold.co/600x400'}
                                    alt={booking.listing?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.listing?.title || 'Unknown Property'}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                                        ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
                                    `}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>{booking.listing?.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>Booked on {new Date(booking.bookingDate).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Link
                                        to={`/listing/${booking.listing?._id}`}
                                        className="btn btn-sm btn-outline gap-2"
                                    >
                                        <ExternalLink size={14} />
                                        View Property
                                    </Link>
                                    <button
                                        onClick={() => handleCancelBooking(booking._id)}
                                        className="btn btn-sm btn-error btn-outline gap-2"
                                    >
                                        <Trash2 size={14} />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mt-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Calendar size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
                    <p className="text-gray-500 mb-6">You haven't booked any properties yet.</p>
                    <Link to="/properties" className="btn btn-primary text-white">
                        Browse Properties
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
