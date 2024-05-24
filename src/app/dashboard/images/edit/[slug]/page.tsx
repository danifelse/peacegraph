"use client";
import FormImage from "@/components/Forms/FormImage";
import { ImageData } from "@/models/ImageData";
import { getData } from "@/services/getDataClient";
import { putData } from "@/services/putDataClients";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditImage({ params }: { params: { slug: string } }) {
  const { push } = useRouter();
  const slug = params.slug;
  const [image, setImage] = useState<ImageData>({} as ImageData);
  useEffect(() => {
    getData(`/api/images/${slug}`)
      .then((res: any) => setImage(res.data.data))
      .catch((err: any) => console.log(err));
  }, []);

  const handleUpdate = async (data: ImageData) => {
    const res = await putData(`/api/images/${slug}`, data);
    if (res.status === 200) {
      toast.success(res.data.message);
      setTimeout(() => {
        push("/dashboard/images");
      }, 2000);
    } else {
      toast.error(res.response.data.error);
    }
  };
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-2">Edit image</h1>
        <Link
          href="/dashboard/images"
          className="text-blue-500 px-3 hover:text-pink-500"
        >
          <span>
            <FaArrowLeftLong className="h-6 w-6 me-3 inline-block" />
          </span>
          Back to Images list
        </Link>
      </div>
      <FormImage image={image} onSubmitForm={handleUpdate} />
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
