"use client";
import { AOSInit } from "@/lib/aos/aos";
export default function ImageHeader({ imageUrl }: { imageUrl: string }) {
  AOSInit();
  return (
    <div
      className="lg:w-1/2 w-full rounded-xl lg:rounded-br-[25%] lg:rounded-tr-[15%] lg:rounded-bl-[50%] lg:rounded-tl-[20%] overflow-hidden lg:m-5"
      data-aos="zoom-in"
    >
      <img src={imageUrl} alt="" className=" aspect-[5/4] object-cover" />
    </div>
  );
}
