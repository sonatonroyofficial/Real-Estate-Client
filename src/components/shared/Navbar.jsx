import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Theme State
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.querySelector('html').setAttribute('data-theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Home</NavLink></li>
            <li><NavLink to="/properties" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Properties</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Contact</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Dashboard</NavLink></li>
                    <li><NavLink to="/favorites" className={({ isActive }) => isActive ? "text-primary font-bold" : ""}>Favorites</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-md px-4 sm:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <FaBars className="text-xl" />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost group">
                    <img src="/brandbay_logo.png" alt="BrandBay" className="h-10 w-auto" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4 text-base font-medium">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {/* Theme Toggle */}
                <label className="swap swap-rotate btn btn-ghost btn-circle">
                    <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                    <FaSun className="swap-on fill-current w-6 h-6 text-yellow-500" />
                    <FaMoon className="swap-off fill-current w-6 h-6 text-gray-500" />
                </label>

                {/* Profile / Login */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border-2 border-primary">
                                <img alt="User" src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="menu-title px-4 py-2">Hi, {user.name}</li>
                            <li><Link to="/dashboard/profile" className="justify-between">Profile <span className="badge badge-sm badge-secondary">New</span></Link></li>
                            <li><Link to="/dashboard/profile">Settings</Link></li>
                            <li><button onClick={handleLogout} className="text-error">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm md:btn-md text-white">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
