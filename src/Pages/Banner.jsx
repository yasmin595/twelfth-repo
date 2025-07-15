import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/pagination';

import Image1 from '../assets/banner!.jpg';
import Image2 from '../assets/banner2.jpg';
import Image3 from '../assets/banner3.jpg';
import Image4 from '../assets/banner4.jpg';

const slidesData = [
  {
    img: Image1,
    title: 'Join Our Mission',
    subtitle: 'Empowering Health, One Camp at a Time',
    desc: 'Discover medical camps across the country. Get free checkups, health advice, and make a difference.',
  },
  {
    img: Image2,
    title: 'Become a Volunteer',
    subtitle: 'Be the Helping Hand Someone Needs',
    desc: 'Contribute to society by joining as a volunteer in our healthcare camps. Every role matters.',
  },
  {
    img: Image3,
    title: 'Organize a Camp',
    subtitle: 'Your Camp, Your Community Impact',
    desc: 'Plan and manage medical camps efficiently with our powerful tools and organized system.',
  },
  {
    img: Image4,
    title: 'Healthy Community',
    subtitle: 'Together for a Better Tomorrow',
    desc: 'Track your participation, give feedback, and stay informed about upcoming health events.',
  },
];

const Banner = () => {
  return (
    <div className="pb-6 mb-10">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="rounded-xl"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full max-w-6xl mx-auto h-[300px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
              {/* Image */}
              <img
                src={slide.img}
                alt="slider"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20"></div>

              {/* Text */}
              <div className="absolute inset-0 flex items-center px-4 md:px-16">
                <div className="max-w-xl text-white space-y-5">
                  <h1 className="text-2xl md:text-4xl font-bold">
                    {slide.title}{' '}
                    <span className="text-green-500">
                      <Typewriter
                        words={['Doctors', 'Organizers', 'Volunteers']}
                        loop
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </span>
                  </h1>
                  <h2 className="text-lg md:text-2xl font-semibold text-green-300">
                    {slide.subtitle}
                  </h2>
                  <p className="text-sm md:text-base text-gray-200">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
