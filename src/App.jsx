import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './providers/AuthProvider';
import AllListings from './pages/Listings/AllListings';

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
          <Route path="contact" element={<div className="p-10 text-center text-3xl">Contact Page</div>} />

          {/* Protected Routes */}
          <Route path="dashboard" element={<PrivateRoute><div className="p-10 text-center text-3xl">Dashboard (Protected)</div></PrivateRoute>} />
          <Route path="favorites" element={<PrivateRoute><div className="p-10 text-center text-3xl">Favorites (Protected)</div></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><div className="p-10 text-center text-3xl">Profile (Protected)</div></PrivateRoute>} />
          <Route path="settings" element={<PrivateRoute><div className="p-10 text-center text-3xl">Settings (Protected)</div></PrivateRoute>} />

          <Route path="*" element={<div className="p-10 text-center text-3xl">404 Not Found</div>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
