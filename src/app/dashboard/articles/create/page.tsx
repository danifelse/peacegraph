"use client";

import FormArticle from "@/components/Forms/FormArticle";
import FormCategory from "@/components/Forms/FormCategory";
import { postData } from "@/services/postDataClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateArticle() {
  const { push } = useRouter();
  const handleCreate = async (data: any) => {
    const res = await postData("/api/articles", data);
    if (res.status === 200) {
      toast.success(res.data.message);
      setTimeout(() => {
        push("/dashboard/articles");
      }, 2000);
    } else {
      toast.error(res.response.data.error);
    }
  };
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-2">Create Article</h1>
        <Link
          href="/dashboard/articles"
          className="text-blue-500 px-3 hover:text-pink-500"
        >
          <span>
            <FaArrowLeftLong className="h-6 w-6 me-3 inline-block" />
          </span>
          Back to Articles list
        </Link>
      </div>
      <FormArticle onSubmitForm={handleCreate} />
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
