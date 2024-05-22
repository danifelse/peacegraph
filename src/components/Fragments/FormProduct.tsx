"use client";

import InputForm from "@/components/Elements/Input";
import SelectOption from "@/components/Elements/SelectOption";
import { useState } from "react";

export default function FormProduct({
  onSubmitForm,
}: {
  onSubmitForm: Function;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const handleImageUrl = () => {
    setImageLoading(true);
    const url = (
      document.querySelector("input[name='imageUrl']") as HTMLInputElement
    )?.value;
    if (url) {
      setImageUrl(url);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setSlug(name.replace(/ /g, "-").toLowerCase());
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
    const category = e.currentTarget.category.value;
    if (!category) {
      setMessage("Please select a category");
      setTimeout(() => {
        setIsloading(false);
        setMessage("");
      }, 2000);
      return;
    }
    if (imageUrl === "") {
      setMessage("Please Upload an image");
      setTimeout(() => {
        setIsloading(false);
        setMessage("");
      }, 2000);
      return;
    }
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.category = category;
    data.imageUrl = imageUrl;
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

    await onSubmitForm(data);
    setIsloading(false);
    setImageLoading(false);
  };

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
      <form onSubmit={handleSubmit}>
        <div className="lg:grid grid-cols-2 gap-4 lg:px-10">
          <div className="  space-y-2 md:space-y-4">
            <SelectOption
              label="Category"
              name="category"
              options={["Printing", "Stickers", "Stamp"]}
            />
            <InputForm
              label="Product Name"
              placeholder="Example : Stand Acrilic"
              name="name"
              type="text"
              onChange={(e) => handleNameChange(e)}
            />
            <InputForm
              label="Slug"
              placeholder="stand-acrilic"
              name="slug"
              type="text"
              defaultValue={slug}
              disabled={true}
            />
            <InputForm
              label="Description"
              placeholder="Descript the product"
              name="description"
              type="text"
            />
            <InputForm
              label="Product Price"
              placeholder="Example : 50000"
              name="price"
              type="number"
            />
          </div>
          <div>
            <div className="relative">
              <InputForm
                name="imageUrl"
                label="Product Image"
                type="text"
                placeholder="Example : https://i.pinimg.com/originals/28/ae/06/28ae067a9c96d806ad09fe213fe56f15.jpg"
              />
              <button
                type="button"
                className="text-sm bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded-lg absolute right-1 -bottom-10"
                onClick={handleImageUrl}
              >
                {imageLoading ? "Loading..." : "Upload"}
              </button>
            </div>
            <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3 aspect-square w-1/2 mx-auto relative">
              <img
                src={
                  imageUrl.length > 0 ? imageUrl : "/images/img-placeholder.svg"
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
              >
                {isloading ? "Loading..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
