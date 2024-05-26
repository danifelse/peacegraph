import { openModal } from "@/lib/redux/features/modals/modalDelete";
import { useAppDispatch } from "@/lib/redux/hooks";
import { ImageData } from "@/models/ImageData";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function ImagesTable({ images }: { images: ImageData[] }) {
  const dispatch = useAppDispatch();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              image Title
            </th>
            <th scope="col" className="px-6 py-3">
              Slug
            </th>
            <th scope="col" className="px-6 py-3">
              Image Url
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr
              key={image.slug}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {image.title}
              </th>
              <td className="px-6 py-4">{image.slug}</td>
              <td className="px-6 py-4">
                {image.imageUrl.length > 20
                  ? image.imageUrl.substring(0, 30) + "..."
                  : image.imageUrl}
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2 items-center">
                  <Link
                    href={`/dashboard/images/edit/${image.slug}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center gap-2"
                  >
                    <FaRegEdit className="w-5 h-5" /> <span>Edit</span>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
