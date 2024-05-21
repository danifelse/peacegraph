"use client";

import InputForm from "@/components/Elements/Input";
import SelectOption from "../Elements/SelectOption";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
export default function FormUser() {
  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const userData = {
      name: form.name.value,
      role: form.role.value,
      email: form.email.value,
      password: form.password.value,
    };

    console.log(userData);
    const res = await axios.post("/api/user", userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apiKey: process.env.API_KEY?.toString(),
      },
    });
    if (res.status === 200) {
      form.reset();
      console.log(res.data);
      push("/");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an user
        </h1>
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
            Create user
          </button>
        </form>
      </div>
    </div>
  );
}
