"use client";
import SkeletonList from "@/components/Fragments/SkeletonList";
import ModalDelete from "@/components/Modals/ModalDelete";
import UsersTable from "@/components/Tables/UsersTable";
import { useAppSelector } from "@/lib/redux/hooks";
import { deleteData } from "@/services/deleteDataClient";
import { getData } from "@/services/getDataClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User() {
  const modalState = useAppSelector((state) => state.modalDelete);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    getData("/api/users")
      .then((res) => {
        setTimeout(() => {
          setUsers(res.data.data);
        }, 300);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteUser = async (id: string) => {
    const res = await deleteData(`/api/users/${id}`);
    if (res.status === 200) {
      toast.success(res.data.message);
      setUsers(users.filter((user: any) => user.id !== id));
    } else {
      toast.error(res.response.data.error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="bg-blue-500 px-10 py-5 rounded-xl flex items-center justify-between">
          <div>
            <h1 className="text-white text-5xl mb-2">Users</h1>
            {users.length > 0 ? (
              <p className="text-white  mb-1">
                {users.length} Users are available
              </p>
            ) : (
              <div className="flex items-center gap-2">
                <AiOutlineLoading3Quarters className="text-white animate-spin" />
                <span className="text-white">Loading...</span>
              </div>
            )}
          </div>
          <Link href="/dashboard/users/create">
            <button className="bg-transparent  hover:bg-blue-500 text-white font-semibold hover:text-blue-700 hover:bg-white hover:border-blue-800 py-2 px-4 border-2 border-white hover:border-transparent rounded-xl flex items-center gap-2">
              <span>
                <IoMdAddCircleOutline className="h-6 w-6" />
              </span>
              Add User
            </button>
          </Link>
        </div>
      </div>
      <div className=" mt-3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {users.length > 0 ? (
          <UsersTable users={users} />
        ) : (
          <div className="">
            <SkeletonList color="blue" />
          </div>
        )}
      </div>
      <ModalDelete modalState={modalState} handleConfirm={deleteUser} />
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
