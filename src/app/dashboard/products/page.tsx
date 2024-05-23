"use client";
import DashboardCardProduct from "@/components/DashboardCardProduct";
import ModalDelete from "@/components/Modals/ModalDelete";
import { useAppSelector } from "@/lib/redux/hooks";
import { Product } from "@/models/Product";
import { deleteData } from "@/services/deleteDataClient";
import { getData } from "@/services/getDataClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const modalState = useAppSelector((state) => state.modalDelete);
  console.log(modalState);

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getData("/api/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteProduct = async (slug: string) => {
    console.log(`page product slug : ${slug}`);
    const res = await deleteData(`/api/products/${slug}`);
    if (res.status === 200) {
      toast.success(res.data.message);
      setProducts(products.filter((product) => product.slug !== slug));
    } else {
      toast.error(res.response.data.error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="bg-pink-500 px-10 py-5 rounded-xl flex items-center justify-between">
          <div>
            <h1 className="text-white text-5xl mb-2">Products</h1>
            <p className="text-white  mb-1">
              {products.length} Products are available
            </p>
          </div>
          <Link href="/dashboard/products/create">
            <button className="bg-transparent  hover:bg-pink-500 text-white font-semibold hover:text-pink-700 hover:border-pink-800 py-2 px-4 border-2 border-white hover:border-transparent rounded-xl flex items-center gap-2">
              <span>
                <IoMdAddCircleOutline className="h-6 w-6" />
              </span>
              Add Product
            </button>
          </Link>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mt-3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {products &&
          products.map((product: Product) => (
            <DashboardCardProduct key={product.id} {...product} />
          ))}
      </div>
      <ModalDelete modalState={modalState} handleConfirm={deleteProduct} />
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
