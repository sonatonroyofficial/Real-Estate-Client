
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, User, ShoppingBag, Star,
    Users, Building, BarChart3, Menu, X, Rocket, LogOut
} from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';

const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    // Determine Role (Fallback to user if not specified)
    const role = (user?.role === 'admin' || user?.email === 'admin@brandbay.com') ? 'admin' : 'user';

    const userLinks = [
        { name: 'My Profile', path: '/dashboard/profile', icon: User },
        { name: 'My Bookings', path: '/dashboard/bookings', icon: ShoppingBag },
    ];

    const adminLinks = [
        { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Manage Users', path: '/dashboard/users', icon: Users },
        { name: 'Manage Listings', path: '/dashboard/listings', icon: Building },
        { name: 'Manage Bookings', path: '/dashboard/all-bookings', icon: ShoppingBag }, // New Link
        { name: 'Statistics', path: '/dashboard/stats', icon: BarChart3 },
    ];

    const links = role === 'admin' ? adminLinks : userLinks;

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-gray-100 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="h-full flex flex-col p-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mb-10 group">
                        <img src="/brandbay_logo.png" alt="BrandBay" className="h-10 w-auto" />
                    </Link>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            // Check if exact match for root or startsWith for nested
                            const isActive = link.path === '/dashboard'
                                ? location.pathname === link.path
                                : location.pathname.startsWith(link.path);

                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
                                        ${isActive
                                            ? 'bg-blue-50 text-blue-600 shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile & Logout */}
                    <div className="border-t border-gray-100 pt-6 mt-6">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || user?.email || 'User'}&background=random`}
                                    alt="User"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 truncate">{user?.displayName || 'User'}</p>
                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors text-sm font-medium"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Actions */}
            <main className="flex-1 w-full min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-gray-900">BrandBay</Link>
                    <button onClick={() => setSidebarOpen(true)} className="p-2 -mr-2 text-gray-600">
                        <Menu size={24} />
                    </button>
                </header>

                <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
