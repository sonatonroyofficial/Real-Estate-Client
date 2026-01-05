
import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ListingCard from '../../components/cards/ListingCard';
import SectionTitle from '../../components/shared/SectionTitle';
import SkeletonCard from '../../components/loaders/SkeletonCard';

const AllListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 'All',
        type: 'All'
    });
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Fetch Data from API
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/api/listings')
            .then(res => res.json())
            .then(data => {
                // Map API data to component structure (matches MongoDB schema now)
                const formattedData = data.map(item => ({
                    ...item,
                    image: item.image || (item.images && item.images[0]) || 'https://placehold.co/600x400',
                    type: item.type || 'sale' // Fallback
                }));
                setListings(formattedData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load listings", err);
                setLoading(false);
            });
    }, []);

    // Helper functions
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1); // Reset to first page on filter change
    };

    // Filtering Logic
    const filteredListings = listings.filter(listing => {
        const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filters.category === 'All' || listing.category === filters.category;
        const matchesType = filters.type === 'All' || listing.type === filters.type;

        // Price Range Logic (Simplified for demo)
        let matchesPrice = true;
        if (filters.priceRange === 'low') matchesPrice = listing.price < 500000;
        if (filters.priceRange === 'mid') matchesPrice = listing.price >= 500000 && listing.price < 1000000;
        if (filters.priceRange === 'high') matchesPrice = listing.price >= 1000000;

        return matchesSearch && matchesCategory && matchesType && matchesPrice;
    });

    // Sorting Logic
    const sortedListings = [...filteredListings].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        // Default newest (using id as proxy for date here)
        return b.id - a.id;
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedListings.length / itemsPerPage);
    const paginatedListings = sortedListings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <SectionTitle
                    title="Find Your Dream Home"
                    subtitle="Explore Our Exclusive Listings"
                />

                {/* Controls Container */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 sticky top-20 z-30">
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title, location..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex flex-wrap gap-3 w-full lg:w-auto">

                            {/* Category Filter */}
                            <div className="relative group">
                                <select
                                    className="appearance-none pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[140px]"
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                >
                                    <option value="All">All Categories</option>
                                    <option value="Luxury">Luxury</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="House">House</option>
                                    <option value="Villa">Villa</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>

                            {/* Price Filter */}
                            <div className="relative group">
                                <select
                                    className="appearance-none pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[140px]"
                                    value={filters.priceRange}
                                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                >
                                    <option value="All">Any Price</option>
                                    <option value="low">Under $500k</option>
                                    <option value="mid">$500k - $1M</option>
                                    <option value="high">Above $1M</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>

                            {/* Sort By */}
                            <div className="relative group">
                                <select
                                    className="appearance-none pl-4 pr-10 py-3 bg-white border border-blue-100 text-blue-900 font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[160px] shadow-sm"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        {paginatedListings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
                                {paginatedListings.map(listing => (
                                    <ListingCard key={listing._id} listing={listing} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No properties found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setFilters({ category: 'All', priceRange: 'All', type: 'All' });
                                    }}
                                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center mt-12 gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${currentPage === i + 1
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            className={`px-4 py-2 rounded-lg border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllListings;
