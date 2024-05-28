"use client";
import { openModal } from "@/lib/redux/features/modals/modalDelete";
import { useAppDispatch } from "@/lib/redux/hooks";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function DashboardCardProduct({
  name,
  price,
  imageUrl,
  slug,
}: {
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
}) {
  const dispatch = useAppDispatch();

  const handleDeleteRequest = (slug: string) => {
    console.log(`product slug : ${slug}`);
    dispatch(openModal(slug));
  };

  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-3 group hover:-translate-y-2 group-hover:shadow-none transition-all duration-500">
      <div className="rounded-t-lg overflow-hidden">
        <img
          className="aspect-square object-cover object-center group-hover:scale-110 transition-all duration-500"
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="md:px-5 px-1 md:py-2 py-1">
        <div className="flex justify-between items-center">
          <div>
            <h5 className="mb-1 md:text-sm text-[9px] font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <p className=" md:text-xs text-[8px] text-gray-700 dark:text-gray-400">
              Rp. {price?.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex items-center  gap-2 group ">
            <Link href={`/dashboard/products/edit/${slug}`}>
              <button>
                <FaRegEdit className="h-7 w-7 text-blue-500 hover:text-blue-700" />
              </button>
            </Link>
            <button onClick={() => handleDeleteRequest(slug)}>
              <MdDelete className="h-7 w-7 text-pink-500 hover:text-pink-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
