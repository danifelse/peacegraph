"use client";

import FormProduct from "@/components/Fragments/FormProduct";
import { Product } from "@/models/Product";
import { postData } from "@/services/postDataClient";

export default function CreateProduct() {
  const handleCreate = async (data: Product) => {
    try {
      const res = await postData("/api/products", data);
      return res;
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h1>Create Product</h1>
      </div>
      <FormProduct onSubmitForm={handleCreate} />
    </div>
  );
}
