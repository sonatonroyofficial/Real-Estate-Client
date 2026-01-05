
import React from 'react';
import { Star, MapPin, ArrowUpRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    const { _id, id, title, price, location, rating, image, category, type } = listing;
    const linkId = _id || id;

    return (
        <div className="group bg-white rounded-3xl p-3 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-2xl h-64 mb-4">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-900 border border-white/50">
                    {category}
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-900 border border-white/50 cursor-pointer hover:bg-black hover:text-white transition-colors">
                    <Heart size={16} />
                </div>

                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20">
                    {type === 'rent' ? 'For Rent' : 'For Sale'}
                </div>
            </div>

            {/* Content */}
            <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md border border-yellow-100">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-yellow-700">{rating || 4.5}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="truncate">{location}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                        <p className="text-xs text-gray-400 font-medium">Price</p>
                        <p className="text-xl font-bold text-gray-900">
                            ${price.toLocaleString()}
                            {type === 'rent' && <span className="text-sm text-gray-500 font-normal">/mo</span>}
                        </p>
                    </div>

                    <Link
                        to={`/listing/${linkId}`}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                    >
                        <ArrowUpRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
