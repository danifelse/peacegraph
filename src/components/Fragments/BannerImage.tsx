"use client";
import { useGetData } from "@/lib/swr/hooks";
import { ImageData } from "@/models/ImageData";
import SkeletonImages from "./SkeletonImages";

export default function BannerImage({ slug }: { slug: string }) {
  const imagesData = useGetData("api/images");
  const images: ImageData[] = imagesData?.data?.data;
  const image = images?.filter((image) => image.slug === slug);

  if (!images) {
    return (
      <div className="mx-auto max-w-7xl mt-20 px-4">
        <div className="w-fulll g:mb-20 md:mb-10 mb-6  overflow-hidden p-0 lg:aspect-[3/1] md:aspect-[9/4] aspect-[9/5] h-full ">
          <SkeletonImages />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="w-full">
        <div className="w-fulll g:mb-20 md:mb-10 mb-6  overflow-hidden p-0 lg:aspect-[3/1] md:aspect-[9/4] aspect-[9/5] h-full relative group">
          <img
            src={image[0]?.imageUrl}
            alt="banner-products"
            className="w-full"
          />
          <div className="absolute top-0 left-0 flex flex-col lg:py-12 lg:px-20 md:py-12 md:px-20 p-4 lg:max-w-2xl md:max-w-md max-w-64">
            <p className="-translate-y-6 group-hover:translate-y-0 transition-all duration-1000 opacity-50 group-hover:opacity-100 text-white lg:text-2xl md:text-xl text-base font-light lg:mb-5 mb:2">
              {image[0].subtitle}
            </p>
            <h2 className="-translate-x-6 group-hover:translate-x-0 transition-all duration-500 opacity-50 group-hover:opacity-100 lg:text-6xl md:text-3xl text-2xl text-white font-extrabold lg:mb-3 mb:1 ">
              {image[0].title}
            </h2>

            <p className="translate-y-9 group-hover:translate-y-0 transition-all duration-1000 opacity-0 group-hover:opacity-100 text-white lg:text-2xl md:text-lg text-sm font-medium">
              {image[0].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
