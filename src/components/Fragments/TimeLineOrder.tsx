"use client";
import { FaWhatsapp } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { LuScreenShare } from "react-icons/lu";
import { MdAttachMoney } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { AOSInit } from "@/lib/aos/aos";
import { useEffect } from "react";

export default function TimeLineOrder() {
  useEffect(() => {
    AOSInit();
  }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-20 " data-aos="fade-up">
      <h2 className="lg:text-3xl md:text-2xl text-xl font-extrabold text-gray-900 mb-5 md:text-center">
        Cetak Online Gak Pake Ribet !
      </h2>
      <ol className="items-center sm:flex py-3 md:py-10">
        <li
          className="relative mb-6 sm:mb-0"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <FaWhatsapp />
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pesan Sekarang
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 1
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Hubungi via WhatsApp atau Email
            </p>
          </div>
        </li>
        <li
          className="relative mb-6 sm:mb-0"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <MdAttachMoney />
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pembayaran
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 2
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Lakukan transfer pembayaran
            </p>
          </div>
        </li>
        <li
          className="relative mb-6 sm:mb-0"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <LuScreenShare />
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Desain
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 3
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Tim Mengerjakan Desain
            </p>
          </div>
        </li>
        <li
          className="relative mb-6 sm:mb-0"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <IoChatbubblesOutline />
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              ACC & Revisi
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 4
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Maks 2x Revisi via WhatsApp
            </p>
          </div>
        </li>
        <li
          className="relative mb-6 sm:mb-0"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <TbTruckDelivery />
            </div>
            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div className="mt-3 sm:pe-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Selesai
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 4
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Produk akan dikirim
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
