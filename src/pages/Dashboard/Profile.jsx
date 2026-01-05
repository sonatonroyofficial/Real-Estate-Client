import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { User, Mail, Camera, Save, MapPin, Phone, Globe, Settings, Bell, Lock, Shield, Trash2 } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Profile Form State
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || '',
        email: user?.email || '',
        phone: '+880 1234 567890',
        address: '123, Tech Street, Dhaka',
        website: 'https://brandbay.com'
    });

    // Settings Form State
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [notifications, setNotifications] = useState({ email: true, push: false, marketing: true });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleNotificationToggle = (key) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await updateUserProfile(formData.displayName, formData.photoURL);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSettingsSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            setMessage({ type: 'success', text: 'Settings saved successfully!' });
        }, 1000);
    };

    return (
        <div className="animate-fade-in-up pb-10">
            {/* Header with Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <SectionTitle title="Account Settings" subtitle="Manage your profile and preferences" align="left" />

                <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm w-fit">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'profile'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <User size={18} />
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${activeTab === 'settings'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        <Settings size={18} />
                        Settings
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side - Profile Snapshot (Visible on both tabs) */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center sticky top-24">
                        <div className="relative inline-block mb-6 group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 mx-auto">
                                <img
                                    src={formData.photoURL || `https://ui-avatars.com/api/?name=${formData.displayName || 'User'}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="text-white" size={24} />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900">{formData.displayName || 'User'}</h2>
                        <p className="text-gray-500 mb-6">{formData.email}</p>

                        <div className="flex flex-col gap-3 text-left">
                            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Role</p>
                                <p className="text-sm font-medium text-gray-700 capitalize">Admin User</p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                                <p className="text-xs text-purple-600 font-bold uppercase mb-1">Member Since</p>
                                <p className="text-sm font-medium text-gray-700">Jan 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Dynamic Content */}
                <div className="lg:col-span-2">
                    {activeTab === 'profile' ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <User size={20} className="text-blue-600" />
                                Edit Personal Details
                            </h3>

                            {message.text && (
                                <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control w-full">
                                        <label className="label"><span className="label-text font-medium text-gray-700">Full Name</span></label>
                                        <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} className="input input-bordered w-full focus:input-primary bg-gray-50" />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label"><span className="label-text font-medium text-gray-700">Phone Number</span></label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input input-bordered w-full focus:input-primary bg-gray-50" />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label"><span className="label-text font-medium text-gray-700">Address</span></label>
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="input input-bordered w-full focus:input-primary bg-gray-50" />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label"><span className="label-text font-medium text-gray-700">Website URL</span></label>
                                        <input type="url" name="website" value={formData.website} onChange={handleChange} className="input input-bordered w-full focus:input-primary bg-gray-50" />
                                    </div>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text font-medium text-gray-700">Photo URL</span></label>
                                    <input type="url" name="photoURL" value={formData.photoURL} onChange={handleChange} placeholder="https://example.com/avatar.jpg" className="input input-bordered w-full focus:input-primary bg-gray-50" />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button type="submit" className={`btn btn-primary px-8 text-white ${loading ? 'loading' : ''}`} disabled={loading}>
                                        {loading ? 'Saving...' : <><Save size={18} className="mr-2" /> Save Changes</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Security Settings */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Shield size={20} className="text-emerald-600" />
                                    Security & Password
                                </h3>

                                <form onSubmit={handleSettingsSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="form-control">
                                            <label className="label"><span className="label-text font-medium">Current Password</span></label>
                                            <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} className="input input-bordered bg-gray-50" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label"><span className="label-text font-medium">New Password</span></label>
                                            <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} className="input input-bordered bg-gray-50" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label"><span className="label-text font-medium">Confirm Password</span></label>
                                            <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} className="input input-bordered bg-gray-50" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button className="btn btn-neutral btn-sm">Update Password</button>
                                    </div>
                                </form>
                            </div>

                            {/* Notification Settings */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Bell size={20} className="text-amber-500" />
                                    Notifications
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <p className="font-bold text-gray-900">Email Notifications</p>
                                            <p className="text-sm text-gray-500">Receive updates about your account activity</p>
                                        </div>
                                        <input type="checkbox" className="toggle toggle-primary" checked={notifications.email} onChange={() => handleNotificationToggle('email')} />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <p className="font-bold text-gray-900">Push Notifications</p>
                                            <p className="text-sm text-gray-500">Receive real-time alerts on your device</p>
                                        </div>
                                        <input type="checkbox" className="toggle toggle-primary" checked={notifications.push} onChange={() => handleNotificationToggle('push')} />
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-red-50 rounded-2xl border border-red-100 p-8">
                                <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                                    <Trash2 size={20} />
                                    Danger Zone
                                </h3>
                                <p className="text-red-600/80 mb-6 text-sm">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button className="btn btn-error btn-outline btn-sm bg-white">Delete Account</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
