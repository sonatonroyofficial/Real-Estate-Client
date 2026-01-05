import React, { useState, useEffect } from 'react';
import { Trash2, UserCheck, Shield, Ban, Search, MoreVertical } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/api/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch users", err);
                setLoading(false);
            });
    }, []);

    const handleChangeRole = (id, newRole) => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: newRole })
        }).then(() => {
            setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
        });
    };

    const handleToggleStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'banned' : 'active';
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        }).then(() => {
            setUsers(users.map(user =>
                user._id === id ? { ...user, status: newStatus } : user
            ));
        });
    };

    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' })
                .then(() => {
                    setUsers(users.filter(user => user._id !== id));
                });
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

    return (
        <div className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
                    <p className="text-sm text-gray-500">Total Users: {users.length}</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                                                <div>
                                                    <p className="font-bold text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                    user.role === 'agent' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
                                            `}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                                            `}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt || user.joined).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 text-gray-400">
                                                {user.role !== 'admin' && (
                                                    <button
                                                        title="Make Admin"
                                                        onClick={() => handleChangeRole(user._id, 'admin')}
                                                        className="p-1 hover:text-purple-600 hover:bg-purple-50 rounded"
                                                    >
                                                        <Shield size={18} />
                                                    </button>
                                                )}

                                                <button
                                                    title={user.status === 'active' ? "Ban User" : "Activate User"}
                                                    onClick={() => handleToggleStatus(user._id, user.status)}
                                                    className={`p-1 rounded ${user.status === 'active' ? 'hover:text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}
                                                >
                                                    {user.status === 'active' ? <Ban size={18} /> : <UserCheck size={18} />}
                                                </button>

                                                <button
                                                    title="Delete User"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    className="p-1 hover:text-red-600 hover:bg-red-50 rounded"
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
                                        No users found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>Showing 1 to {filteredUsers.length} of {users.length} entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
