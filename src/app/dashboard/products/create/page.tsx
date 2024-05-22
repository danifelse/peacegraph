"use client";

import FormProduct from "@/components/Fragments/FormProduct";
import { Product } from "@/models/Product";
import { postData } from "@/services/postDataClient";
import { useRouter } from "next/navigation";
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
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h1>Create Product</h1>
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
