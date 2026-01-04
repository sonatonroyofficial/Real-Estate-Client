import React from 'react';

const SectionTitle = ({ title, subtitle, align = "center" }) => {
    const alignClass = align === "left" ? "text-left items-start" : align === "right" ? "text-right items-end" : "text-center items-center";

    return (
        <div className={`flex flex-col gap-2 mb-10 ${alignClass}`}>
            {subtitle && (
                <span className="text-secondary font-semibold uppercase tracking-widest text-sm">
                    {subtitle}
                </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-base-content relative pb-3">
                {title}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-secondary rounded-full block mt-2"></span>
                {align === 'left' && <style>{`.absolute { left: 0; transform: none; }`}</style>}
                {align === 'right' && <style>{`.absolute { right: 0; left: auto; transform: none; }`}</style>}
            </h2>
            {/* Inline style trick for convenience, or better strictly conditionally apply classes for the line position */}
            {/* Let's refine the line logic to be cleaner */}
        </div>
    );
};

// Refined Version with cleaner CSS
const SectionTitleRefined = ({ title, subtitle, align = "center" }) => {
    const containerClasses = {
        left: "text-left items-start",
        center: "text-center items-center",
        right: "text-right items-end"
    };

    const lineClasses = {
        left: "self-start",
        center: "self-center",
        right: "self-end"
    };

    return (
        <div className={`flex flex-col gap-2 mb-12 ${containerClasses[align] || containerClasses.center}`}>
            {subtitle && (
                <span className="text-secondary font-medium uppercase tracking-wider text-sm">
                    {subtitle}
                </span>
            )}
            <h2 className="text-3xl md:text-5xl font-bold text-base-content">
                {title}
            </h2>
            <div className={`w-24 h-1.5 bg-secondary rounded-full mt-1 ${lineClasses[align] || lineClasses.center}`}></div>
        </div>
    );
};

export default SectionTitleRefined;
