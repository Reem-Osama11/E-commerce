import React from "react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Note: these are default exports, not named exports { } like you had before
import slider1 from "../../assets/slider-image-1.jpeg";
import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-3.jpeg";

export default function Mainslider() {
  return  (
    <div className="max-w-6xl mx-auto p-4">
      {/* التغيير هنا: خلي الارتفاع تلقائي على الموبايل وثابت فقط على الشاشات الكبيرة md:h-[420px] */}
      <div className="flex flex-col md:flex-row gap-2 h-auto md:h-[420px]">
        
        {/* Left side - Swiper with dots */}
        {/* التغيير هنا: حددنا ارتفاع ثابت للـ ستايدر على الموبايل h-[250px] وعاد طبيعي md:h-full على الشاشات الكبيرة */}
        <div className="w-full md:w-2/3 h-[250px] md:h-full">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            className="h-full rounded-md overflow-hidden product-swiper"
          >
            <SwiperSlide>
              <img
                src={slider1}
                alt="slide 1"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={slider2}
                alt="slide 2"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={slider3}
                alt="slide 3"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Right side - two stacked static images */}
        {/* التغيير هنا: إخفاء الصورتين الثابتين على الموبايل وإظهارهم فقط بدءاً من الشاشات المتوسطة والكبيرة لأن مالهومش مكان مريح على الشاشة الصغيرة */}
        <div className="hidden md:flex w-full md:w-1/3 h-full flex-col gap-2">
          <div className="h-1/2 rounded-md overflow-hidden">
            <img
              src={slider2}
              alt="side 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-1/2 rounded-md overflow-hidden">
            <img
              src={slider3}
              alt="side 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
