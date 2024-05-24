"use client";
import Slider from "react-slick";
import { Product } from "@/models/Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardProduct from "../Cards/CardProduct";

export default function ProductCarousel({
  products,
  index,
}: {
  products: Product[];
  index: number;
}) {
  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 3,
    dots: false,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    nextArrow: <NextArrow index={index} />,
    prevArrow: <PrevArrow index={index} />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          rows: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          rows: 1,
          slidesToScroll: 2,
          infinite: true,
        },
      },

      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2,
          rows: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          rows: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="w-full h-full pl-4 ">
      {products.map((product: Product) => (
        <CardProduct key={product.slug} {...product} />
      ))}
    </Slider>
  );
}

export function NextArrow(props: any) {
  const { className, style, onClick, index } = props;
  return (
    <div
      className={`flex justify-center absolute top-1/2 translate-y-[60%]   z-10 ${
        index % 2 === 0 ? "lg:-left-20 -left-10 " : "lg:-right-20 -right-10"
      } `}
    >
      <button
        className="bg-pink-500 bg-opacity-60 hover:bg-pink-500 text-white font-bold md:py-2 md:px-4 rounded-full focus:outline-none focus:shadow-outline"
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
  const { className, style, onClick, index } = props;
  return (
    <div
      className={`flex justify-center absolute top-1/2 -translate-y-[60%]   z-10 ${
        index % 2 === 0 ? "lg:-left-20 -left-10 " : "lg:-right-20 -right-10"
      } `}
    >
      <button
        className="bg-pink-500 bg-opacity-60 hover:bg-pink-500 text-white font-bold md:py-2 md:px-4 rounded-full focus:outline-none focus:shadow-outline"
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
