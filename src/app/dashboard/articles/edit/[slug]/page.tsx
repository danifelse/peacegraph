"use client";
import FormArticle from "@/components/Forms/FormArticle";
import Loading from "@/components/Fragments/Loading";
import { Article } from "@/models/Articles";
import { getData } from "@/services/getDataClient";
import { putData } from "@/services/putDataClients";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditArticle({ params }: { params: { slug: string } }) {
  const { push } = useRouter();
  const slug = params.slug;
  const [article, setArticle] = useState<Article>({} as Article);
  useEffect(() => {
    setTimeout(() => {
      getData(`/api/articles/${slug}`)
        .then((res: any) => setArticle(res.data.data))
        .catch((err: any) => console.log(err));
    }, 300);
  }, []);

  const handleUpdate = async (data: Article) => {
    const res = await putData(`/api/articles/${slug}`, data);
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
        <h1 className="text-xl font-semibold mb-2">Edit Article</h1>
        <Link
          href="/dashboard/articles"
          className="text-blue-500 px-3 hover:text-pink-500"
        >
          <span>
            <FaArrowLeftLong className="h-6 w-6 me-3 inline-block" />
          </span>
          Back to articles list
        </Link>
      </div>
      {article.slug ? (
        <FormArticle article={article} onSubmitForm={handleUpdate} />
      ) : (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-4 h-96 flex items-center justify-center">
          <Loading />
        </div>
      )}
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
