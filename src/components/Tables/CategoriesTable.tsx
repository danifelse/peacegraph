import { openModal } from "@/lib/redux/features/modals/modalDelete";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Category } from "@/models/Category";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function CategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  const dispatch = useAppDispatch();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Category name
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
          {categories.map((category) => (
            <tr
              key={category.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {category.name}
              </th>
              <td className="px-6 py-4">{category.slug}</td>
              <td className="px-6 py-4">
                {category.imageUrl.length > 20
                  ? category.imageUrl.substring(0, 30) + "..."
                  : category.imageUrl}
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2 items-center">
                  <Link
                    href={`/dashboard/categories/edit/${category.slug}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline "
                  >
                    <FaRegEdit className="w-5 h-5" />
                  </Link>
                  <button
                    className="font-medium text-red-600 dark:text-blue-500 hover:underline "
                    onClick={() => dispatch(openModal(category.slug))}
                  >
                    <MdOutlineDeleteOutline className="w-6 h-6" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
