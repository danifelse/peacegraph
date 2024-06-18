"use client";
import { Product } from "@/models/Product";
import Link from "next/link";
import { FaCartArrowDown, FaWhatsapp } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import uniqid from "uniqid";
import InputForm from "../Elements/Input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function OrderSection({ product }: { product: Product }) {
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    const form = event.target as HTMLFormElement;
    const userData = {
      nama: form.namaPemesan.value,
      nomorWhatsapp: form.noWa.value,
      product: form.productName.value,
      quantity: form.quantity.value,
      id: uniqid(),
    };

    for (const [key, value] of Object.entries(userData)) {
      if (!value) {
        setMessage(`Harap isi kolom ${key} `);
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setIsloading(false);
        return;
      }
    }

    const url = `https://api.whatsapp.com/send?phone=628118811647&text=Halo%20saya%20${userData.nama}.%0ASaya%20ingin%20order%20${userData.product}%20sebanyak%20${userData.quantity}%20pcs.`;
    window.open(url, "_blank");
    setIsOrder(false);
    setIsloading(false);
  };
  return (
    <>
      <div className={`flex -mx-2 mb-4 mt-4 ${isOrder && "hidden"}`}>
        <div className="w-1/2 px-2">
          <button
            className="w-full bg-pink-600 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-pink-800 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
            onClick={() => setIsOrder(true)}
          >
            Pesan
            <span>
              <FaCartArrowDown className="w-6 h-6" />
            </span>
          </button>
        </div>
        <div className="w-1/2 px-2">
          <Link
            href="/products"
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
          >
            <span>
              <FaArrowLeftLong />
            </span>
            Kembali
          </Link>
        </div>
      </div>
      <div className={`mb-4 mt-4 ${!isOrder && "hidden"}`}>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
          <div className="p-4 space-y-2 md:space-y-2 sm:p-6">
            {message.length > 0 && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{message}</span>
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputForm
                label="Nama Pemesan"
                name="namaPemesan"
                type="text"
                placeholder="Example"
              />

              <input
                type="text"
                name="productName"
                value={product.name}
                hidden
              />
              <div className="flex gap-2">
                <div className="w-2/3">
                  <InputForm
                    label="No. WhatsApp"
                    name="noWa"
                    type="number"
                    placeholder="628979761661"
                  />
                </div>
                <div className="w-1/3">
                  <InputForm
                    label="Jumlah"
                    name="quantity"
                    type="number"
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="lg:flex space-y-2 lg:space-y-0 justify-between">
                <button
                  type="submit"
                  className="flex w-full lg:w-[40%] bg-blue-600 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-800 dark:hover:bg-gray-700  items-center justify-center gap-2"
                >
                  {isloading ? "Loading..." : "Buat Pesanan"}
                  <span>
                    <FaWhatsapp className="w-6 h-6" />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full lg:w-[40%] bg-red-600 dark:bg-red-600 text-white py-2 px-4 rounded-full font-bold hover:bg-red-800 dark:hover:bg-red-700  items-center justify-center gap-2"
                  onClick={() => setIsOrder(false)}
                >
                  {isloading ? "Loading..." : "Batal"}
                  <span>
                    <IoMdClose className="w-6 h-6" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
