"use client";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import HeaderCarousels from "./HeaderCarousels";
import { ImageData } from "@/models/ImageData";
import { useGetData } from "@/lib/swr/hooks";
import SkeletonImages from "./SkeletonImages";
import Skeleton from "./Skeleton";
import ImageHeader from "./ImageHeader";

export default function Header() {
  const imagesData = useGetData("api/images");
  const images: ImageData[] = imagesData?.data?.data;

  if (!images) {
    return (
      <div className="mx-auto max-w-7xl mt-20 px-4">
        <div className="w-fulll g:mb-20 md:mb-10 mb-6  overflow-hidden p-0 lg:aspect-[3/1] md:aspect-[9/4] aspect-[9/5] h-full ">
          <SkeletonImages />
        </div>
        <div className=" sm:px-6 mb-20">
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <header className="mt-20 ">
      <HeaderCarousels
        images={images.filter((image) => image.slug.startsWith("carousel"))}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-20">
        <div className="lg:flex  items-center">
          <div className="lg:w-1/2 w-full lg:px-3 mb-3 lg:mb-0">
            <h1 className="lg:text-6xl text-2xl py-2 font-extrabold bg-gradient-to-r from-pink-600 to-blue-700 inline-block text-transparent bg-clip-text">
              {images[0]?.title}
            </h1>
            <h2 className="lg:text-5xl text-2xl font-extrabold text-gray-700 mb-3 ">
              {images[0]?.subtitle}
            </h2>
            <p className="lg:text-lg  text-gray-700">{images[0]?.desc}</p>
            <div className="flex mt-5 px-2 cursor-pointer">
              <a
                href="https://wa.me/c/628118811647"
                target="_blank"
                className="text-gray-700 group hover:text-gray-900 transition-all duration-500"
              >
                <FaWhatsapp className="inline-block h-6 w-6 me-2 group-hover:-translate-y-4 transition-all duration-500" />
              </a>
              <a
                href="https://www.instagram.com/peacegraph_/"
                target="_blank"
                className="text-gray-700 group hover:text-gray-900 transition-all duration-500"
              >
                <FaInstagram className="inline-block h-6 w-6 me-2 group-hover:-translate-y-4 transition-all duration-500" />
              </a>
              <a
                href="http://tiktok.com/@peacegraph7"
                target="_blank"
                className="text-gray-700 group hover:text-gray-900 transition-all duration-500"
              >
                <FaTiktok className="inline-block h-5 w-6 me-2 group-hover:-translate-y-4 transition-all duration-500" />
              </a>
              <a
                href="https://goo.gl/maps/MgK7c1U1Sw7yiGdN8"
                target="_blank"
                className="text-gray-700 group hover:text-gray-900 transition-all duration-500"
              >
                <FaLocationDot className="inline-block h-6 w-6 me-2 group-hover:-translate-y-4 transition-all duration-500" />
              </a>
            </div>
            <button className="bg-gradient-to-r from-pink-600 to-blue-700 hover:from-pink-800 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-full mt-5">
              Hubungi Kami
            </button>
          </div>
          <ImageHeader imageUrl={images[0]?.imageUrl} />
        </div>
      </div>
    </header>
  );
}
