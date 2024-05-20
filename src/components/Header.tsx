import { getBannerData } from "@/services/getData";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default async function Header() {
  const banner = await getBannerData();
  return (
    <header className="mt-5">
      <div className="container mx-auto p-4">
        <div className="lg:flex  items-center">
          <div className="lg:w-1/2 w-full lg:px-3 mb-3 lg:mb-0">
            <h1 className="lg:text-6xl text-2xl py-2 font-extrabold bg-gradient-to-r from-pink-600 to-blue-700 inline-block text-transparent bg-clip-text">
              Peacegraph
            </h1>
            <h2 className="lg:text-5xl text-2xl font-extrabold text-gray-700 mb-3 ">
              {banner[0].title}
            </h2>
            <p className="lg:text-lg  text-gray-700">{banner[0].description}</p>
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
            <button className="bg-gradient-to-r from-pink-600 to-blue-700 hover:from-pink-800 hover:to-blue-800 text-white font-bold py-2 px-4 rounded mt-5">
              Hubungi Kami
            </button>
          </div>
          <div className="lg:w-1/2 w-full rounded-lg overflow-hidden lg:m-5">
            <img
              src={banner[0].imageUrl}
              alt=""
              className=" aspect-[5/4] object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
