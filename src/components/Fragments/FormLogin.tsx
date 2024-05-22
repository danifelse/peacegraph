"use client";

import { signIn, useSession } from "next-auth/react";
import InputForm from "../Elements/Input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function FormLogin() {
  const { push } = useRouter();
  const [message, setMessage] = useState<string>("");
  const [isloading, setIsloading] = useState<boolean>(false);
  const callbackUrl: string = "/dashboard";
  const { data: session } = useSession();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const userData = {
      email: form.email.value,
      password: form.password.value,
    };
    if (!userData.email) {
      setMessage("Please fill in the email field");
      setTimeout(() => {
        setMessage("");
        setIsloading(false);
      }, 2000);
      return;
    }

    if (!userData.password) {
      setMessage("Please fill in the password field");
      setTimeout(() => {
        setMessage("");
        setIsloading(false);
      }, 2000);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: userData.email,
        password: userData.password,
        callbackUrl: callbackUrl,
      });
      if (!res?.error) {
        setIsloading(false);
        toast.success("Login Success");
        push(callbackUrl);
        form.reset();
      } else {
        toast.error("Error Email or Password is Incorrect");
        setTimeout(() => {
          setIsloading(false);
        }, 2000);
      }
    } catch (error) {
      toast.error("Error Email or Password is Incorrect");
      setTimeout(() => {
        setIsloading(false);
        setIsloading(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="w-full bg-transparent rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
          <div>
            {message.length > 0 && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 w-full rounded-xl absolute -top-10"
                role="alert"
              >
                <span className="block sm:inline">{message}</span>
              </div>
            )}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2">
              Login
            </h1>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Welcome back, please enter your credentials.
            </p>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <InputForm
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
            />
            <InputForm
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
            />
            <p className="text-sm font-light text-gray-950 dark:text-gray-400">
              You&apos;re not Admin ?{" "}
              <Link href="/" className="text-blue-600">
                Click Here
              </Link>{" "}
              to continue as User.
            </p>
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-600  to-blue-700 text-white font-bold py-2 px-6 rounded-full"
            >
              {isloading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
