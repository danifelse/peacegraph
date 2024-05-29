"use client";

import InputForm from "@/components/Elements/Input";
import { FormEvent, useState } from "react";
export default function FormProfile({
  onSubmitForm,
}: {
  onSubmitForm: Function;
}) {
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsloading(false);
  };

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-10">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <img
            src="https://i.pinimg.com/564x/c4/34/d8/c434d8c366517ca20425bdc9ad8a32de.jpg"
            alt=""
            className="rounded-full w-[75%] aspect-square object-cover object-center"
          />
        </div>
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
            <InputForm
              label="Email"
              name="email"
              type="email"
              placeholder="Example@gmail.com"
            />

            <InputForm
              label="imageUrl"
              name="imageUrl"
              type="text"
              placeholder="https://example.com"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              // disabled={isloading}
            >
              {isloading ? "Loading..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
