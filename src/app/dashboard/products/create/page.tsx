"use client";

import FormProduct from "@/components/Fragments/FormProduct";
import { Product } from "@/models/Product";
import { postData } from "@/services/postDataClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProduct() {
  const { push } = useRouter();
  const handleCreate = async (data: Product) => {
    try {
      const res = await postData("/api/products", data);
      toast.success("Product created successfully");
      setTimeout(() => push("/dashboard/products"), 2000);
      return res;
    } catch (error) {
      toast.error("Failed to create product");
      return error;
    }
  };
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-2">Create Product</h1>
        <Link
          href="/dashboard/products"
          className="text-blue-500 px-3 hover:text-pink-500"
        >
          <span>
            <FaArrowLeftLong className="h-6 w-6 me-3 inline-block" />
          </span>
          Back to Products list
        </Link>
      </div>
      <FormProduct onSubmitForm={handleCreate} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
