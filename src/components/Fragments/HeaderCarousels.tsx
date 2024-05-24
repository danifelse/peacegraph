"use client";
import { ImageData } from "@/models/ImageData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaWhatsapp } from "react-icons/fa";

export default function HeaderCarousels({ images }: { images: ImageData[] }) {
  const setting = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Slider {...setting} className="group  ">
      {images.map((image) => (
        <div
          key={image.slug}
          className=" w-fulll g:mb-20 md:mb-10 mb-6  bg-red-300 overflow-hidden p-0 lg:aspect-[3/1] md:aspect-[9/4] aspect-[9/5] h-full relative"
        >
          <img
            src={image.imageUrl}
            alt="image"
            className=" h-full w-full object-center object-cover"
          />
          <div className="absolute top-0 right-0 text-end flex flex-col justify-end  lg:py-20 lg:px-32 md:py-20 md:px-20 p-4 lg:max-w-2xl md:max-w-md max-w-64">
            <p className="text-white lg:text-2xl md:text-xl text-base font-light lg:mb-5 mb:2">
              {image.subtitle}
            </p>
            <h2 className="lg:text-6xl md:text-3xl text-2xl text-white font-extrabold lg:mb-3 mb:1 ">
              {image.title}
            </h2>

            <p className="text-white lg:text-2xl md:text-lg text-sm font-medium">
              {image.desc}
            </p>
            <div className=" flex justify-end">
              <a
                href="https://wa.me/c/628118811647"
                target="_blank"
                className="bg-white bg-opacity-70 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-5 flex items-center gap-2 "
              >
                Order
                <FaWhatsapp className="inline-block h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className="absolute top-1/2 right-10 -translate-y-1/2 z-10 opacity-0 group-hover:-translate-x-5 group-hover:opacity-100 transition-all duration-500">
      <button
        className="bg-white bg-opacity-70 hover:bg-gray-300 text-gray-800 font-bold md:py-2 md:px-4 rounded-full focus:outline-none focus:shadow-outline"
        onClick={onClick}
        style={{ ...style }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

export function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className="absolute top-1/2 left-10 -translate-y-1/2 z-10 opacity-0 group-hover:translate-x-5 group-hover:opacity-100 transition-all duration-500">
      <button
        className="bg-white bg-opacity-70 hover:bg-gray-300 text-gray-800 font-bold md:py-2 md:px-4 rounded-full focus:outline-none focus:shadow-outline"
        onClick={onClick}
        style={{ ...style }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  );
}
