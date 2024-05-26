import { openModal } from "@/lib/redux/features/modals/modalDelete";
import { useAppDispatch } from "@/lib/redux/hooks";
import { User } from "@/models/User";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function UsersTable({ users }: { users: User[] }) {
  const dispatch = useAppDispatch();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Users name
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user?.name}
              </th>
              <td className="px-6 py-4">{user?.role}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-2 items-center">
                  <button
                    className="font-medium text-red-600 dark:text-blue-500 hover:underline flex items-center gap-1"
                    onClick={() => dispatch(openModal(user?.id))}
                  >
                    <MdOutlineDeleteOutline className="w-6 h-6" />{" "}
                    <span>Delete</span>
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
