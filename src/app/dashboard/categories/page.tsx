"use client";
import ModalDelete from "@/components/Modals/ModalDelete";
import CategoriesTable from "@/components/Tables/CategoriesTable";
import { useAppSelector } from "@/lib/redux/hooks";
import { Category } from "@/models/Category";
import { deleteData } from "@/services/deleteDataClient";
import { getData } from "@/services/getDataClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Categories() {
  const modalState = useAppSelector((state) => state.modalDelete);

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getData("/api/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteCategory = async (slug: string) => {
    console.log(`page product slug : ${slug}`);
    const res = await deleteData(`/api/categories/${slug}`);
    if (res.status === 200) {
      toast.success(res.data.message);
      setCategories(categories.filter((category) => category.slug !== slug));
    } else {
      toast.error(res.response.data.error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="bg-blue-500 px-10 py-5 rounded-xl flex items-center justify-between">
          <div>
            <h1 className="text-white text-5xl mb-2">Categories</h1>
            <p className="text-white  mb-1">
              {categories.length} Categories are available
            </p>
          </div>
          <Link href="/dashboard/categories/create">
            <button className="bg-transparent  hover:bg-blue-500 text-white font-semibold hover:text-blue-700 hover:bg-white hover:border-blue-800 py-2 px-4 border-2 border-white hover:border-transparent rounded-xl flex items-center gap-2">
              <span>
                <IoMdAddCircleOutline className="h-6 w-6" />
              </span>
              Add Category
            </button>
          </Link>
        </div>
      </div>
      <div className=" mt-3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <CategoriesTable categories={categories} />
      </div>
      <ModalDelete modalState={modalState} handleConfirm={deleteCategory} />
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
