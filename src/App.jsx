import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ListingDetails from './pages/Listings/ListingDetails';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './providers/AuthProvider';
import AllListings from './pages/Listings/AllListings';
import DashboardLayout from './layout/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Public Routes */}
          <Route path="properties" element={<AllListings />} />
          <Route path="listing/:id" element={<ListingDetails />} />
          <Route path="contact" element={<div className="p-10 text-center text-3xl">Contact Page</div>} />

          <Route path="*" element={<div className="p-10 text-center text-3xl">404 Not Found</div>} />
        </Route>

        {/* Dashboard Layout Routes */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<div className="p-10 text-center text-3xl">My Profile</div>} />
          <Route path="bookings" element={<div className="p-10 text-center text-3xl">My Bookings</div>} />
          <Route path="users" element={<div className="p-10 text-center text-3xl">Manage Users</div>} />
          <Route path="listings" element={<div className="p-10 text-center text-3xl">Manage Listings</div>} />
          <Route path="stats" element={<div className="p-10 text-center text-3xl">Statistics</div>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
