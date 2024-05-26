"use client";

import InputForm from "@/components/Elements/Input";
import SelectOption from "../Elements/SelectOption";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
export default function FormUser({ onSubmitForm }: { onSubmitForm: Function }) {
  const { push } = useRouter();
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    const form = event.target as HTMLFormElement;
    const userData = {
      name: "",
      role: "",
      email: form.email.value,
      password: form.password.value,
      id: uniqid(),
    };

    const selectedRole = document.getElementById("role") as HTMLInputElement;
    userData.role = selectedRole.value;
    const selectedName = document.getElementById("name") as HTMLInputElement;
    userData.name = selectedName.value;

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

    await onSubmitForm(userData);
    // console.log(userData);

    setIsloading(false);
  };

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
      <div className="p-4 space-y-2 md:space-y-2 sm:p-6">
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
            // disabled={isloading}
          >
            {isloading ? "Loading..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}
