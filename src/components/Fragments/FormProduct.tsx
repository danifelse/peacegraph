"use client";

import InputForm from "@/components/Elements/Input";
import SelectOption from "@/components/Elements/SelectOption";
import { useState } from "react";

export default function FormProduct() {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUrl = () => {
    const url = (
      document.querySelector("input[name='imageUrl']") as HTMLInputElement
    )?.value;
    console.log(url);
    if (url) {
      setImageUrl(url);
    }
  };

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
      <form action="">
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
                Upload
              </button>
            </div>
            <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3 aspect-square w-1/2 mx-auto relative">
              <img
                src={
                  imageUrl.length > 0 ? imageUrl : "/images/img-placeholder.svg"
                }
                alt=""
              />
              <p className="text-red-500 text-sm w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                Image cannot be uplloaded. <br /> Please check the URL you
                provided
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
