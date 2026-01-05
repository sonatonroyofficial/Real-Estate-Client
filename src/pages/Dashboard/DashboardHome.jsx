
import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Users, DollarSign, Home, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const DashboardHome = () => {
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
                console.error("Failed to fetch dashboard stats", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
    if (!stats) return <div className="p-10 text-center text-red-500">Failed to load dashboard data.</div>;

    // Process Data for Charts
    const categoryData = stats.listingsByCategory?.map(item => ({
        name: item._id,
        value: item.count
    })) || [];

    // Calculate Active Listings
    const activeListingsCount = stats.listingsByStatus?.find(s => s._id === 'Available')?.count || 0;

    // Use Real Bookings Data
    const bookingsData = stats.monthlyBookings || [];

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        label: 'Total Asset Value',
                        value: `$${(stats.totalListingValue || 0).toLocaleString()}`,
                        icon: DollarSign,
                        change: '+12.5%',
                        isUp: true,
                        color: 'text-green-600 bg-green-50'
                    },
                    {
                        label: 'Total Users',
                        value: stats.totalUsers,
                        icon: Users,
                        change: '+8.2%',
                        isUp: true,
                        color: 'text-blue-600 bg-blue-50'
                    },
                    {
                        label: 'Total Listings',
                        value: stats.totalListings,
                        icon: Home,
                        change: '+3.4%',
                        isUp: true,
                        color: 'text-purple-600 bg-purple-50'
                    },
                    {
                        label: 'Active Listings',
                        value: activeListingsCount,
                        icon: Activity,
                        change: '+2.4%',
                        isUp: true,
                        color: 'text-orange-600 bg-orange-50'
                    },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bookings Trend Chart (Real Data) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Booking Trends</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={bookingsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', border: 'none' }}
                                    itemStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Listing Categories</h3>
                    {categoryData.length > 0 ? (
                        <>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                {categoryData.map((entry, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                            <span className="text-sm text-gray-600">{entry.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-900">
                                            {((entry.value / stats.totalListings) * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-400">
                            No category data available
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Listings Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Recent Listings</h3>
                    <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Property</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.recentListings && stats.recentListings.length > 0 ? (
                                stats.recentListings.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                                        <td className="px-6 py-4 text-gray-600">${item.price?.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                                            `}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No recent listings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
