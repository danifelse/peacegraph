"use client";
import { useSession } from "next-auth/react";
import { FaUserCheck } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="bg-blue-500 px-16 py-10 rounded-xl">
          <h1 className="text-white text-5xl mb-2">
            Hi, {session?.user?.name} !
          </h1>
          <p className="text-white  mb-1">
            <span className="inline-block me-1">
              <FaUserCheck />
            </span>
            {session?.user?.role}
          </p>
          <p className="text-white  mb-1">
            <span className="inline-block me-1">
              <IoMdMail />
            </span>
            {session?.user?.email}
          </p>
          <p className="text-white text-2xl mt-3">Welcome back to dashboard</p>
          <button className="bg-transparent  hover:bg-blue-500 text-white font-semibold hover:text-blue-700 hover:border-blue-800 py-2 px-4 border-2 border-white hover:border-transparent rounded-xl mt-5">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-3">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="bg-blue-500 p-5 rounded-xl">
            <p className="text-white text-7xl mb-3">3</p>
            <p className="text-white text-2xl">Images Uploaded</p>
          </div>
        </div>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="bg-blue-500 p-5 rounded-xl">
            <p className="text-white text-7xl mb-3">15</p>
            <p className="text-white text-2xl">Product Posted</p>
          </div>
        </div>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="bg-blue-500 p-5 rounded-xl">
            <p className="text-white text-7xl mb-3">5</p>
            <p className="text-white text-2xl">Article Posted</p>
          </div>
        </div>
      </div>
    </div>
  );
}
