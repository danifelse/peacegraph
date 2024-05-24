"use client";

import InputForm from "@/components/Elements/Input";
import { ImageData } from "@/models/ImageData";
import { useEffect, useState } from "react";

export default function FormImage({
  image = {} as ImageData,
  onSubmitForm,
}: {
  image?: ImageData;
  onSubmitForm: Function;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(image).length) {
      setImageUrl(image?.imageUrl);
    }
  }, [image]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    for (const key in data) {
      if (!data[key]) {
        setMessage(`Please fill in the ${key} field`);
        setTimeout(() => {
          setIsloading(false);
          setMessage("");
        }, 2000);
        return;
      }
    }
    if (imageUrl === "") {
      setMessage("Please Upload an image");
      setTimeout(() => {
        setIsloading(false);
        setMessage("");
      }, 2000);
      return;
    }

    data.imageUrl = imageUrl;

    await onSubmitForm(data);
    setIsloading(false);
    setImageLoading(false);
  };

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
      <form onSubmit={handleSubmit}>
        <div className="lg:grid grid-cols-2 gap-4 lg:px-10">
          <div className="  space-y-2 md:space-y-4">
            <input type="text" name="slug" defaultValue={image?.slug} hidden />
            <InputForm
              label="Title"
              placeholder="Example : Stand Acrilic"
              name="title"
              type="text"
              defaultValue={image?.title}
            />
            <InputForm
              label="Subtitle"
              placeholder="stand-acrilic"
              name="subtitle"
              type="text"
              defaultValue={image?.subtitle}
            />
            <InputForm
              label="Description"
              placeholder="stand-acrilic"
              name="desc"
              type="text"
              defaultValue={image?.desc}
            />
          </div>
          <div>
            <InputForm
              name="imageUrl"
              label="image Url"
              type="text"
              placeholder="Example : https://i.pinimg.com/originals/28/ae/06/28ae067a9c96d806ad09fe213fe56f15.jpg"
              defaultValue={image?.imageUrl}
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="text-sm bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded-lg "
                onClick={handleImageUrl}
              >
                {imageLoading ? "Loading..." : "Upload"}
              </button>
            </div>
            <div
              className={`border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3  w-full mx-auto relative mb-3 ${
                image.slug === "header-image"
                  ? "aspect-[4/3] w-[80%]"
                  : "aspect-[3/1]"
              }`}
            >
              <img
                src={
                  imageUrl?.length > 0
                    ? imageUrl
                    : "/images/img-placeholder.svg"
                }
                alt="Image"
                className="w-full h-full object-cover rounded-lg"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              <p className="text-red-500 text-sm w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                Image cannot be uplloaded. <br /> Please check the URL you
                provided
              </p>
            </div>

            <div className="flex justify-end items-center gap-5">
              {message && <p className="text-red-500 text-sm">{message}</p>}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                disabled={isloading}
              >
                {isloading
                  ? "Loading..."
                  : `${image.slug ? "Update" : "Create"}`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
