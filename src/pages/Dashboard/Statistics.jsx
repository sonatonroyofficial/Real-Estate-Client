
import React, { useState, useEffect } from 'react';
import { Users, Home, Grid, PieChart, Activity, DollarSign } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';

const Statistics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch stats", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 text-center">Loading Statistics...</div>;
    if (!stats) return <div className="p-10 text-center">Failed to load statistics.</div>;

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
                <Icon size={32} className={`text-${color.split('-')[1]}-600`} />
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in-up">
            <SectionTitle title="Platform Statistics" subtitle="Real-time Data Overview" align="left" />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="bg-blue-600" />
                <StatCard title="Total Listings" value={stats.totalListings} icon={Home} color="bg-green-600" />
                <StatCard title="Categories" value={stats.totalCategories} icon={Grid} color="bg-purple-600" />
                <StatCard title="Active Listings" value={stats.listingsByStatus && stats.listingsByStatus.find(s => s._id === 'Available')?.count || 0} icon={Activity} color="bg-amber-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Listings by Category */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <PieChart size={20} className="text-blue-500" />
                        Listings by Category
                    </h3>
                    <div className="space-y-4">
                        {stats.listingsByCategory && stats.listingsByCategory.map((cat, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{cat._id}</span>
                                    <span className="text-gray-500">{cat.count} listings</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${(cat.count / stats.totalListings) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                        {(!stats.listingsByCategory || stats.listingsByCategory.length === 0) && <p className="text-gray-400 italic">No category data available.</p>}
                    </div>
                </div>

                {/* Listings by Status */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Activity size={20} className="text-green-500" />
                        Listing Status
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stats.listingsByStatus && stats.listingsByStatus.map((status, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
                                <div className="text-3xl font-bold text-gray-900 mb-1">{status.count}</div>
                                <div className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                                    ${status._id === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}
                                `}>
                                    {status._id}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
