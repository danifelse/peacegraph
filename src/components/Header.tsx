import getData from "@/services/getData";
import axios from "axios";
export async function getBannerData() {
  const banner = await getData.banner();
  console.log(banner.data.data);
  return banner.data.data;
}

export default async function Header() {
  const banner = await getBannerData();
  console.log(banner[0].imageUrl);
  return (
    <header className="mt-5">
      <div className="container mx-auto p-4">
        <div className="lg:flex  items-center">
          <div className="lg:w-1/2 w-full lg:px-3 mb-3 lg:mb-0">
            <h1 className="lg:text-5xl text-2xl font-extrabold text-gray-700 mb-3 ">
              {banner[0].title}
            </h1>
            <p className="lg:text-lg  text-gray-700">{banner[0].description}</p>
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
