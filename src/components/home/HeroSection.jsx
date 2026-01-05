import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { FaArrowRight, FaSearch } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSection = () => {
    const slides = [
        {
            id: 1,
            image: "/images/hero_banner_1.png",
            title: "Discover Your Dream Sanctuary",
            subtitle: "Luxury estates, modern apartments, and exclusive villas in prime locations.",
            cta: "Explore Properties"
        },
        {
            id: 2,
            image: "/images/hero_banner_2.png",
            title: "Experience Modern Living",
            subtitle: "Architectural masterpieces designed for comfort, style, and elegance.",
            cta: "View Collections"
        },
        {
            id: 3,
            image: "/images/hero_banner_3.png",
            title: "Find a Place to Call Home",
            subtitle: "From cozy cottages to sprawling mansions, we have it all.",
            cta: "Start Searching"
        }
    ];

    return (
        <div className="relative h-[70vh] w-full group">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                className="h-full w-full"
                loop={true}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                                <div className="max-w-4xl space-y-6 text-white animate-fade-in-up">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto drop-shadow-md">
                                        {slide.subtitle}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                                        <button className="btn btn-primary btn-lg border-none shadow-lg hover:scale-105 transition-transform text-white gap-2">
                                            {slide.cta} <FaArrowRight />
                                        </button>
                                        <button className="btn btn-outline btn-lg text-white hover:bg-white hover:text-black hover:border-white transition-all">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons (hidden on mobile, visible on hover) */}
                <div className="swiper-button-prev !text-white !hidden md:group-hover:!block transition-opacity duration-300 left-8"></div>
                <div className="swiper-button-next !text-white !hidden md:group-hover:!block transition-opacity duration-300 right-8"></div>
            </Swiper>

            {/* Quick Search Bar Overlap */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-11/12 max-w-5xl z-20 hidden md:block">
                <div className="bg-base-100 p-6 rounded-xl shadow-2xl flex flex-col md:flex-row gap-4 items-center border border-base-200">
                    <div className="flex-1 w-full">
                        <label className="form-control w-full">
                            <div className="label"><span className="label-text font-semibold">Location</span></div>
                            <input type="text" placeholder="City, Neighborhood, ZIP" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="flex-1 w-full">
                        <label className="form-control w-full">
                            <div className="label"><span className="label-text font-semibold">Property Type</span></div>
                            <select className="select select-bordered w-full">
                                <option disabled selected>Select Type</option>
                                <option>House</option>
                                <option>Apartment</option>
                                <option>Condo</option>
                                <option>Villa</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex-1 w-full">
                        <label className="form-control w-full">
                            <div className="label"><span className="label-text font-semibold">Price Range</span></div>
                            <select className="select select-bordered w-full">
                                <option disabled selected>Any Price</option>
                                <option>$100k - $300k</option>
                                <option>$300k - $600k</option>
                                <option>$600k - $1M</option>
                                <option>$1M+</option>
                            </select>
                        </label>
                    </div>
                    <div className="w-full md:w-auto mt-0 md:mt-8">
                        <button className="btn btn-primary w-full md:w-auto h-[3rem] px-8 text-lg font-bold">
                            <FaSearch /> Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
