"use client";

import { useState } from "react";
import { FaAward } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

export default function HeaderSection() {
  const [isOpen, setIsOpen] = useState(1);
  return (
    <div className="container mt-10 py-10 mx-auto p-4 max-w-3xl">
      <h2 className="lg:text-3xl text-2xl text-center font-extrabold text-gray-700 px-3">
        Kenapa harus Peacegraph?
      </h2>

      <div className="mb-4 mt-3 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                isOpen === 1 ? "active-tabs" : "inactive-tabs"
              }`}
              onClick={() => setIsOpen(1)}
            >
              <FaAward className="inline-block h-8 w-8 me-2" />
              <span className="text-lg hidden md:inline-block">
                Profesional
              </span>
            </button>
          </li>
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                isOpen === 2 ? "active-tabs" : "inactive-tabs"
              }`}
              onClick={() => setIsOpen(2)}
            >
              <GiStarsStack className="inline-block h-8 w-8 me-2" />
              <span className="text-lg hidden md:inline-block">Berkualias</span>
            </button>
          </li>
          <li className="me-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                isOpen === 3 ? "active-tabs" : "inactive-tabs"
              }`}
              onClick={() => setIsOpen(3)}
            >
              <TbTruckDelivery className="inline-block h-8 w-8 me-2" />
              <span className="text-lg hidden md:inline-block">Siap Krim</span>
            </button>
          </li>
          <li>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                isOpen === 4 ? "active-tabs" : "inactive-tabs"
              }`}
              onClick={() => setIsOpen(4)}
            >
              <MdAttachMoney className="inline-block h-8 w-8 me-2" />
              <span className="text-lg hidden md:inline-block">
                Harga Terjangkau
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div className="relative h-64 md:h-36">
        <div
          className={`p-4 rounded-lg bg-purple-300 dark:bg-gray-800 transition-all duration-300 absolute top-0 left-0 ${
            isOpen === 1
              ? "opacity-100 translate-y-0 "
              : "opacity-0 translate-y-14"
          }`}
        >
          <p className="text-gray-700 dark:text-gray-400">
            Peacegraph memiliki tim yang berpengalaman dan berdedikasi tinggi
            dalam industri percetakan dan digital printing. Kami memastikan
            setiap proyek dikelola dengan standar profesionalisme tertinggi,
            dari desain hingga hasil akhir. Kami selalu berkomitmen untuk
            memberikan layanan yang cepat, akurat, dan memuaskan.
          </p>
        </div>
        <div
          className={`p-4 rounded-lg bg-purple-300 dark:bg-gray-800 transition-all duration-300 absolute top-0 left-0 ${
            isOpen === 2
              ? "opacity-100 translate-y-0 "
              : "opacity-0 translate-y-14"
          }`}
        >
          <p className=" text-gray-700 dark:text-gray-400">
            Kami hanya menggunakan bahan dan teknologi tercanggih untuk
            memastikan setiap hasil cetakan memiliki kualitas terbaik. Dari
            resolusi gambar yang tajam hingga warna yang akurat, Peacegraph
            menjamin setiap detail diperhatikan. Produk kami selalu diuji untuk
            memenuhi standar kualitas tertinggi.
          </p>
        </div>
        <div
          className={`p-4 rounded-lg bg-purple-300 dark:bg-gray-800 transition-all duration-300 absolute top-0 left-0 ${
            isOpen === 3
              ? "opacity-100 translate-y-0 "
              : "opacity-0 translate-y-14"
          }`}
        >
          <p className=" text-gray-700 dark:text-gray-400">
            Peacegraph memahami pentingnya waktu bagi pelanggan kami. Oleh
            karena itu, kami memastikan setiap pesanan diproses dan dikirim
            tepat waktu. Dengan layanan pengiriman yang cepat dan terpercaya,
            Anda dapat mengandalkan Peacegraph untuk memenuhi kebutuhan cetak
            Anda tanpa penundaan.
          </p>
        </div>
        <div
          className={`p-4 rounded-lg bg-purple-300 dark:bg-gray-800 transition-all duration-500 absolute top-0 left-0 ${
            isOpen === 4
              ? "opacity-100 translate-y-0 "
              : "opacity-0 translate-y-14"
          }`}
        >
          <p className=" text-gray-700 dark:text-gray-400">
            Kami menawarkan harga yang kompetitif tanpa mengorbankan kualitas.
            Peacegraph percaya bahwa layanan percetakan berkualitas tinggi harus
            dapat diakses oleh semua orang. Dengan berbagai pilihan paket dan
            penawaran khusus, kami memberikan nilai terbaik untuk investasi Anda
            dalam produk cetak.
          </p>
        </div>
      </div>
    </div>
  );
}
