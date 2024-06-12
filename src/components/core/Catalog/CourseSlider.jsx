import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Course_Card from "./CourseCard";

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          // slidesPerView={1}
          // spaceBetween={25}
          pagination={{ clickable: true }}
          loop={true}
          modules={[Autoplay, FreeMode, Navigation, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i} className="w-full">
              <Course_Card course={course} Height={`sm:h-52`} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
