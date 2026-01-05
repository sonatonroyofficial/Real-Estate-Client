import React, { useState, useEffect } from 'react';
import { Check, X, Clock, Calendar, User, Home, MessageSquare } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';

const ManageBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            // Fetch ALL bookings for admin (using a prop or just standard GET if backend supports it)
            // Backend endpoint GET /api/bookings returns filtered by email if query provided,
            // or ALL if no query provided. So we just fetch without params to get everything.
            const response = await fetch('http://localhost:5000/api/bookings');
            const data = await response.json();
            setBookings(data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to load bookings", error);
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        // Since backend doesn't have explicit Patch/Update status route yet, we'll Mock it or implementing it.
        // For now, let's just delete/cancel for "Reject" and maybe do nothing for Approve visually.
        // Wait, normally we should update status.
        // I will implement a quick console log for now as the backend route for 'PATCH /:id' is on 'users' not bookings.

        if (status === 'Cancelled') {
            if (!window.confirm("Are you sure you want to cancel this booking?")) return;
            try {
                await fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' });
                setBookings(bookings.filter(b => b._id !== id));
            } catch (err) {
                console.error("Failed to cancel", err);
            }
        } else {
            alert(`Feature to mark as ${status} coming soon to API!`);
        }
    };

    if (loading) return <div className="p-10 text-center"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Manage Bookings</h1>
                    <p className="text-gray-500">View and manage all property booking requests</p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold">
                    Total: {bookings.length}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Property</th>
                                <th>User</th>
                                <th>Date Requested</th>
                                <th>Notes</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={booking.listing?.image || "https://placehold.co/100"} alt="Property" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold max-w-[150px] truncate">{booking.listing?.title || "Unknown Property"}</div>
                                                <div className="text-xs opacity-50 flex items-center gap-1">
                                                    <Home size={10} /> {booking.listing?.location}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                                    <span className="text-xs">
                                                        {booking.user?.name ? booking.user.name[0] : (booking.user?.email ? booking.user.email[0] : 'U')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{booking.user?.name || "Guest"}</div>
                                                <div className="text-xs opacity-50">{booking.user?.email || "No Email"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar size={14} />
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                            <Clock size={14} className="ml-1" />
                                            {new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="tooltip" data-tip={booking.notes}>
                                            <div className="badge badge-ghost gap-1 cursor-help">
                                                <MessageSquare size={12} />
                                                View Note
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`badge ${booking.status === 'Pending' ? 'badge-warning' : booking.status === 'Confirmed' ? 'badge-success' : 'badge-error'} gap-2`}>
                                            {booking.status}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAction(booking._id, 'Confirmed')}
                                                className="btn btn-square btn-sm btn-ghost text-green-600 hover:bg-green-50"
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleAction(booking._id, 'Cancelled')}
                                                className="btn btn-square btn-sm btn-ghost text-red-600 hover:bg-red-50"
                                                title="Reject"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-400">
                                        No booking requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;
