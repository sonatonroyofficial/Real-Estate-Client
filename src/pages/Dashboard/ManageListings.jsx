
import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Search, MapPin, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';

const ManageListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/api/listings')
            .then(res => res.json())
            .then(data => {
                setListings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch listings", err);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
            fetch(`http://localhost:5000/api/listings/${id}`, { method: 'DELETE' })
                .then(() => {
                    setListings(listings.filter(item => item._id !== id));
                })
                .catch(err => console.error("Failed to delete", err));
        }
    };

    const filteredListings = listings.filter(item =>
        (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

    return (
        <div className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Manage Listings</h2>
                    <p className="text-sm text-gray-500">Total Properties: {listings.length}</p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                        <Plus size={18} />
                        <span className="hidden sm:inline">Add Listing</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Property</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredListings.length > 0 ? (
                                filteredListings.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                                                    <img src={item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/100x100'} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 line-clamp-1">{item.title}</p>
                                                    <p className="text-xs text-gray-500">Agent: {item.agent?.name || 'Unknown'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            ${(item.price || 0).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            <div className="flex items-center gap-1.5 text-sm">
                                                <MapPin size={14} className="text-gray-400" />
                                                <span className="truncate max-w-[150px]">{item.location}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
                                            `}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 text-gray-400">
                                                <Link
                                                    to={`/listing/${item._id}`}
                                                    target="_blank"
                                                    className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded"
                                                    title="View Public Page"
                                                >
                                                    <Eye size={18} />
                                                </Link>

                                                <button
                                                    className="p-1 hover:text-amber-600 hover:bg-amber-50 rounded"
                                                    title="Edit Listing"
                                                >
                                                    <Edit size={18} />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-1 hover:text-red-600 hover:bg-red-50 rounded"
                                                    title="Delete Listing"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No properties found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>Showing 1 to {filteredListings.length} of {listings.length} entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageListings;
