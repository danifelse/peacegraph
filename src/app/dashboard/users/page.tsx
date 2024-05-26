"use client";
import ModalDelete from "@/components/Modals/ModalDelete";
import UsersTable from "@/components/Tables/UsersTable";
import { useAppSelector } from "@/lib/redux/hooks";
import { User } from "@/models/User";
import { deleteData } from "@/services/deleteDataClient";
import { getData } from "@/services/getDataClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User() {
  const modalState = useAppSelector((state) => state.modalDelete);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getData("/api/users")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteUser = async (id: string) => {
    const res = await deleteData(`/api/user/${id}`);
    if (res.status === 200) {
      toast.success(res.data.message);
      setUsers(users.filter((user) => user.id !== id));
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
            <p className="text-white  mb-1">
              {users.length} Users are available
            </p>
          </div>
          <Link href="/dashboard/user/create">
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
        <UsersTable users={users} />
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
