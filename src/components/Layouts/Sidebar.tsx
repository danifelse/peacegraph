"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillProduct } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { FaTags, FaUserEdit } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { MdDashboard, MdEditNote, MdMessage } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-5 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition duration-300 hover:translate-x-2 hover:font-bold hover:text-blue-700 ${
                pathname == "/dashboard" && "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <MdDashboard
                className={`${
                  pathname === "/dashboard"
                    ? "w-8 h-8 text-blue-700"
                    : "w-6 h-6 group-hover:text-blue-500"
                }`}
              />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/users"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition duration-300 hover:translate-x-2 hover:font-bold hover:text-blue-700 ${
                pathname.startsWith("/dashboard/users") &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <HiUsers
                className={`transition duration-300 ${
                  pathname.startsWith("/dashboard/users")
                    ? "w-8 h-8 text-blue-700"
                    : "w-6 h-6 group-hover:text-blue-500"
                }`}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/products"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition duration-300 hover:translate-x-2 hover:font-bold hover:text-blue-700 ${
                pathname.startsWith("/dashboard/products") &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <AiFillProduct
                className={`transition duration-300 ${
                  pathname.startsWith("/dashboard/products")
                    ? "w-8 h-8 text-blue-700"
                    : "w-6 h-6 group-hover:text-blue-500"
                }`}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/categories"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition duration-300 hover:translate-x-2 hover:font-bold hover:text-blue-700 ${
                pathname.startsWith("/dashboard/categories") &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <FaTags
                className={`transition duration-300 ${
                  pathname.startsWith("/dashboard/categories")
                    ? "w-8 h-8 text-blue-700"
                    : "w-6 h-6 group-hover:text-blue-500"
                }`}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Categories</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/images"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition duration-300 hover:translate-x-2 hover:font-bold hover:text-blue-700 ${
                pathname.startsWith("/dashboard/images") &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <BsImages
                className={`transition duration-300 ${
                  pathname.startsWith("/dashboard/images")
                    ? "w-8 h-8 text-blue-700"
                    : "w-6 h-6 group-hover:text-blue-500"
                }`}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Images</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/articles"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition duration-300 hover:translate-x-2 hover:font-bold hover:text-blue-700 ${
                pathname.startsWith("/dashboard/articles") &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <MdEditNote
                className={`transition duration-300 ${
                  pathname.startsWith("/dashboard/articles")
                    ? "w-8 h-8 text-blue-700"
                    : "w-6 h-6 group-hover:text-blue-500"
                }`}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Articles</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/profile"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group transition duration-300 hover:translate-x-2 hover:font-bold hover:text-blue-700 ${
                pathname.startsWith("/dashboard/profile") &&
                "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <FaUserEdit
                className={`transition duration-300 ${
                  pathname.startsWith("/dashboard/profile")
                    ? "w-8 h-8 text-blue-700"
                    : "w-6 h-6 group-hover:text-blue-500"
                }`}
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
            </Link>
          </li>
          <li>
            <div
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              <RiLogoutBoxLine className="w-6 h-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
