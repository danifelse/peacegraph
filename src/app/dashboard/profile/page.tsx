"use client";
import FormProfile from "@/components/Forms/FormProfile";
import SkeletonList from "@/components/Fragments/SkeletonList";
import CategoriesTable from "@/components/Tables/CategoriesTable";
import { useAppSelector } from "@/lib/redux/hooks";
import { Category } from "@/models/Category";
import { getData } from "@/services/getDataClient";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const modalState = useAppSelector((state) => state.modalDelete);

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    setTimeout(() => {
      getData("/api/categories")
        .then((res) => setCategories(res.data.data))
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="bg-blue-500 px-10 py-5 rounded-xl flex items-center justify-between">
          <div>
            <h1 className="text-white text-5xl mb-2">My Profile</h1>
            {categories.length > 0 ? (
              <p className="text-white  mb-1">
                {categories.length} Categories are available
              </p>
            ) : (
              <div className="flex items-center gap-2">
                <AiOutlineLoading3Quarters className="text-white animate-spin" />
                <span className="text-white">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" mt-3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {categories.length > 0 ? (
          <FormProfile />
        ) : (
          <SkeletonList color="blue" />
        )}
      </div>
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
