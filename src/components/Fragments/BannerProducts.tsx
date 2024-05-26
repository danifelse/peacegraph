import { useGetData } from "@/lib/swr/hooks";
import { ImageData } from "@/models/ImageData";
import SkeletonImages from "./SkeletonImages";
import Skeleton from "./Skeleton";

export default function BannerProducts() {
  const imagesData = useGetData("api/images");
  const images: ImageData[] = imagesData?.data?.data;
  const image = images?.filter((image) => image.slug === "banner-products");
  console.log(image);

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
    <div className="mt-20">
      <div className="w-full">
        <div className="w-fulll g:mb-20 md:mb-10 mb-6  overflow-hidden p-0 lg:aspect-[3/1] md:aspect-[9/4] aspect-[9/5] h-full ">
          <img
            src={image[0]?.imageUrl}
            alt="banner-products"
            className="w-full"
          />
          <div className="absolute top-0 left-0 flex flex-col lg:mt-8 md:mt-6 mt-3 lg:py-20 lg:px-32 md:py-20 md:px-20 p-4 lg:max-w-2xl md:max-w-md max-w-64">
            <p className="text-white lg:text-2xl md:text-xl text-base font-light lg:mb-5 mb:2">
              {image[0].subtitle}
            </p>
            <h2 className="lg:text-6xl md:text-3xl text-2xl text-white font-extrabold lg:mb-3 mb:1 ">
              {image[0].title}
            </h2>

            <p className="text-white lg:text-2xl md:text-lg text-sm font-medium">
              {image[0].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
