"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@heroui/react";

import "swiper/css";
import "swiper/css/effect-fade";

const Banner = () => {
  const images = [
    "/banner_images/banner_01.png",
    "/banner_images/banner_02.png",
    "/banner_images/banner_03.png",
  ];

  return (
    <div className="flex max-w-7xl mx-auto flex-col lg:flex-row items-center gap-8 lg:gap-12 py-10 px-5">
      {/* Text */}
      <div className="flex-1 flex flex-col gap-4 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-black leading-tight">
          Book trusted doctors, <span className="text-accent">Anytime</span>
        </h1>
        <p className="text-muted text-lg max-w-md mx-auto lg:mx-0">
          Browse verified doctors, check availability, and book appointments
          online in minutes.
        </p>
        <div className="flex justify-center lg:justify-start gap-3 mt-2">
          <Link href="/all-appointments">
            <Button size="lg">Browse Doctors</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Swiper */}
      <div className="flex-1 w-full overflow-hidden rounded-3xl">
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
              <div className="relative w-full aspect-4/3">
                <Image
                  src={image}
                  alt={`Banner ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
