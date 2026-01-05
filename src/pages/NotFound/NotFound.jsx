
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            {/* 404 Illustration placeholder or text */}
            <h1 className="text-9xl font-extrabold text-gray-200 select-none">404</h1>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                <p className="text-gray-500 mb-8 max-w-md">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>

                    <Link
                        to="/"
                        className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition flex items-center justify-center gap-2"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
