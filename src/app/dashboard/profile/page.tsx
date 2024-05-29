"use client";
import FormProfile from "@/components/Forms/FormProfile";
import Loading from "@/components/Fragments/Loading";
import { User } from "@/models/User";
import { getData } from "@/services/getDataClient";
import { putData } from "@/services/putDataClients";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { data: session } = useSession();
  const [userDetail, setUserDetail] = useState<User>({} as User);
  const [isloading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  useEffect(() => {
    if (session) {
      getData(`/api/users/${session.user?.id}`)
        .then((res) => setUserDetail(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [session]);

  const handleUpdate = async (data: User) => {
    setIsLoading(true);
    const res = await putData(`/api/users/${session?.user?.id}`, data);
    if (res.status === 200) {
      toast.success(res.data.message);
      setIsEdited(true);
      setIsLoading(false);
    } else {
      toast.error(res.response.data.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="bg-blue-500 px-10 py-5 rounded-xl flex items-center justify-between">
          <div>
            <h1 className="text-white text-5xl mb-2">My Profile</h1>
            {isloading && (
              <div className="flex items-center gap-2">
                <AiOutlineLoading3Quarters className="text-white animate-spin" />
                <span className="text-white">Loading...</span>
              </div>
            )}
            {userDetail?.name && !isEdited && !isloading && (
              <p className="text-white  mb-1">Edit Profile</p>
            )}
            {userDetail?.name && isEdited && !isloading && (
              <div className="flex items-center gap-2">
                <span className="text-white">
                  <FaCheck className="w-6 h-6" />
                </span>
                <p className="text-white  mb-1">Profile Updated</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" mt-3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {userDetail?.name ? (
          <FormProfile onSubmitForm={handleUpdate} user={userDetail} />
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <Loading />
          </div>
        )}
      </div>
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
