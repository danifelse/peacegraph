"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillProduct } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { MdDashboard, MdMessage } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                pathname === "/dashboard" && "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <MdDashboard className="w-6 h-6" />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/message"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                pathname === "/dashboard/message" &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <MdMessage className="w-6 h-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">Message</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                1
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/users"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                pathname === "/dashboard/users" &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <HiUsers className="w-6 h-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/products"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                pathname === "/dashboard/products" &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <AiFillProduct className="w-6 h-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <RiLogoutBoxLine className="w-6 h-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
