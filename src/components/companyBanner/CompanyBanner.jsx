import React from "react";
import banner from "../../asset/image/banner.jpg";
import { baseUrl } from "../api/Api";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import { Link } from "react-router-dom";

const CompanyBanner = ({ advertisements }) => {
  var count = 1;
  return (
    <>
      <div className="company_banner">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {advertisements.map((data, key) => {
            if (data.position === "top_banner") {
              return (
                <div className="banner_container" key={data.id}>
                  <SwiperSlide>
                    <img src={`${baseUrl}/${data.banner}`} alt="i-vault" />
                  </SwiperSlide>
                </div>
              );
            }
          })}
        </Swiper>
      </div>
    </>
  );
};

export default CompanyBanner;
