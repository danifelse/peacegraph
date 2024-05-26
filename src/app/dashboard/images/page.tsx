"use client";
import SkeletonList from "@/components/Fragments/SkeletonList";
import ModalDelete from "@/components/Modals/ModalDelete";
import ImagesTable from "@/components/Tables/ImagesTable";
import { useAppSelector } from "@/lib/redux/hooks";
import { ImageData } from "@/models/ImageData";
import { deleteData } from "@/services/deleteDataClient";
import { getData } from "@/services/getDataClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Images() {
  const modalState = useAppSelector((state) => state.modalDelete);
  const [images, setImages] = useState<ImageData[]>([]);
  useEffect(() => {
    setTimeout(() => {
      getData("/api/images")
        .then((res) => setImages(res.data.data))
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  const deleteImage = async (slug: string) => {
    console.log(`page product slug : ${slug}`);
    const res = await deleteData(`/api/images")/${slug}`);
    if (res.status === 200) {
      toast.success(res.data.message);
      setImages(images.filter((image) => image.slug !== slug));
    } else {
      toast.error(res.response.data.error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="bg-teal-500 px-10 py-5 rounded-xl flex items-center justify-between">
          <div>
            <h1 className="text-white text-5xl mb-2">Images</h1>
            {images.length > 0 ? (
              <p className="text-white  mb-1">
                {images.length} Images are available
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
        {images.length > 0 ? (
          <ImagesTable images={images} />
        ) : (
          <div>
            <SkeletonList color="teal" />
          </div>
        )}
      </div>
      <ModalDelete modalState={modalState} handleConfirm={deleteImage} />
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
