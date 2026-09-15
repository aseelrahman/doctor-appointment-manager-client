"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const Banner = () => {
  const images = [
    "/banner_images/banner_01.png",
    "/banner_images/banner_02.png",
    "/banner_images/banner_03.png",
  ];
  return (
    <div className="overflow-hidden rounded-3xl">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              src={image}
              alt={`Banner ${i + 1}`}
              width={1672}
              height={653}
              className="w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
