
import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'primary', fullScreen = false }) => {

    // Size Mapping
    const sizeClasses = {
        sm: 'loading-sm',
        md: 'loading-md',
        lg: 'loading-lg',
        xl: 'h-16 w-16' // Custom for extra large
    };

    // Color Logic (DaisyUI uses text colors for loading spinners usually)
    const colorClass = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        white: 'text-white',
        black: 'text-black'
    };

    const spinnerContent = (
        <div className="flex flex-col items-center justify-center gap-3">
            <span className={`loading loading-spinner ${sizeClasses[size] || 'loading-md'} ${colorClass[color] || 'text-primary'}`}></span>
            {fullScreen && <span className="text-gray-500 font-medium animate-pulse">Loading...</span>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                {spinnerContent}
            </div>
        );
    }

    return spinnerContent;
};

export default LoadingSpinner;
