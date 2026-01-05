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
import ManageUsers from './pages/Dashboard/ManageUsers';
import ManageListings from './pages/Dashboard/ManageListings';
import Statistics from './pages/Dashboard/Statistics';
import NotFound from './pages/NotFound/NotFound';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Dashboard/Profile';
import MyBookings from './pages/Dashboard/MyBookings';
import ManageBookings from './pages/Dashboard/ManageBookings';

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
          <Route path="contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dashboard Layout Routes */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="all-bookings" element={<ManageBookings />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="listings" element={<ManageListings />} />
          <Route path="stats" element={<Statistics />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
