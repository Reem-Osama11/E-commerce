import axios from "axios";
import React, { useEffect, useState } from "react";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  function getallcategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getallcategories();
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="my-4">
        <h2 className="text-2xl font-normal text-gray-700">
          Shop Popular Categories
        </h2>
      </div>
      <Swiper
        modules={[FreeMode, Pagination]}
        freeMode={true}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={2}
        pagination={{ clickable: true }}
        style={{
          "--swiper-pagination-color": "#4b5563",
          "--swiper-pagination-bullet-inactive-color": "#d1d5db",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          paddingBottom: "40px",
        }}
        breakpoints={{
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 8 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="flex flex-col items-center text-center cursor-pointer">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="mt-2 text-sm font-medium">{category.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>
  );
}