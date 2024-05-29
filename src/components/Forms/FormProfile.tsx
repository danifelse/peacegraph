"use client";

import InputForm from "@/components/Elements/Input";
import { User } from "@/models/User";
import { FormEvent, useEffect, useState } from "react";
export default function FormProfile({
  onSubmitForm,
  user,
}: {
  onSubmitForm: Function;
  user: User;
}) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isloading, setIsloading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (user.imageUrl) {
      setImageUrl(user.imageUrl);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.fullName.value;
    const email = form.email.value;
    const imageUrl = form.imageUrl.value;
    user.name = name;
    user.email = email;
    user.imageUrl = imageUrl;
    onSubmitForm(user);
    setIsloading(false);
  };

  const handleImageUrl = () => {
    setImageLoading(true);
    const url = (
      document.querySelector("input[name='imageUrl']") as HTMLInputElement
    )?.value;
    if (url) {
      setImageUrl(url);
    }
  };

  const handleImageError = () => {
    setIsloading(true);
    setImageLoading(false);
    setMessage("Failed to load the image. Please check the URL and try again");
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setIsloading(false);
    setMessage("");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="flex justify-center items-center">
        <img
          src={
            imageUrl.length > 0
              ? imageUrl
              : "https://i.pinimg.com/564x/c4/34/d8/c434d8c366517ca20425bdc9ad8a32de.jpg"
          }
          alt=""
          className="rounded-full w-[75%] aspect-square object-cover object-center"
          onError={handleImageError}
          onLoad={handleImageLoad}
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
            name="fullName"
            type="text"
            placeholder="Example"
            defaultValue={user?.name}
          />
          <InputForm
            label="Email"
            name="email"
            type="email"
            placeholder="Example@gmail.com"
            defaultValue={user?.email}
          />

          <InputForm
            label="imageUrl"
            name="imageUrl"
            type="text"
            placeholder="https://example.com"
            defaultValue={user?.imageUrl}
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded-lg "
              onClick={handleImageUrl}
            >
              {imageLoading ? "Loading..." : "Upload"}
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isloading}
          >
            {isloading ? "Loading..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
