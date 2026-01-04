
import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full h-64 bg-gray-200 rounded-2xl mb-4"></div>

            {/* Content Skeleton */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
                </div>

                <div className="h-6 w-3/4 bg-gray-200 rounded-lg"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded-lg"></div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-4">
                    <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
