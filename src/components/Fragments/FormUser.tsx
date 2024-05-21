"use client";

import InputForm from "@/components/Elements/Input";
import SelectOption from "../Elements/SelectOption";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
export default function FormUser() {
  const { push } = useRouter();
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    const form = event.target as HTMLFormElement;
    const userData = {
      name: form.name.value,
      role: form.role.value,
      email: form.email.value,
      password: form.password.value,
    };

    if (!userData.role) {
      setMessage("Please select a role");
      setTimeout(() => {
        setMessage("");
        setIsloading(false);
      }, 2000);
      return;
    }

    if (userData.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setTimeout(() => {
        setMessage("");
        setIsloading(false);
      }, 2000);
      return;
    }

    if (userData.password !== form.confirmPassword.value) {
      setMessage("Passwords does not match");
      setTimeout(() => {
        setMessage("");
        setIsloading(false);
      }, 2000);
      return;
    }

    console.log(userData);
    const res = await axios.post("/api/user", userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apiKey: process.env.API_KEY?.toString(),
      },
    });
    if (res.data.status === 200) {
      form.reset();
      console.log(res.data);
      push("/");
    } else {
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
        setIsloading(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an user
        </h1>
        {message.length > 0 && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <InputForm
            label="Name"
            name="name"
            type="text"
            placeholder="Example"
          />
          <SelectOption
            label={"Role"}
            name={"role"}
            options={["Admin", "Super Admin"]}
          />
          <InputForm
            label="Email"
            name="email"
            type="email"
            placeholder="Example@gmail.com"
          />

          <InputForm
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <InputForm
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isloading ? "Loading..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}
