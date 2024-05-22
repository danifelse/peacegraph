"use client";
import FormProduct from "@/components/Fragments/FormProduct";
import { Product } from "@/models/Product";
import { getData } from "@/services/getDataClient";
import { putData } from "@/services/putDataClients";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

export default function EditProduct({ params }: { params: { slug: string } }) {
  const { push } = useRouter();
  const slug = params.slug;
  const [product, setProduct] = useState<Product>({} as Product);
  useEffect(() => {
    getData(`/api/products/${slug}`)
      .then((res: any) => setProduct(res.data.data))
      .catch((err: any) => console.log(err));
  }, []);

  const handleUpdate = async (data: Product) => {
    const res = await putData(`/api/products/${slug}`, data);
    if (res.status === 200) {
      toast.success(res.data.message);
      setTimeout(() => {
        push("/dashboard/products");
      }, 2000);
    } else {
      toast.error(res.response.data.error);
    }
  };
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-2">Edit Product</h1>
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
      <FormProduct product={product} onSubmitForm={handleUpdate} />
    </div>
  );
}
