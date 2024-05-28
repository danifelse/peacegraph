"use client";

import InputForm from "@/components/Elements/Input";
import { Category } from "@/models/Category";
import { useEffect, useState } from "react";

export default function FormArticle({
  category = {} as Category,
  onSubmitForm,
}: {
  category?: Category;
  onSubmitForm: Function;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (Object.keys(category).length) {
      setSlug(category?.name?.replace(/ /g, "-").toLowerCase());
      setImageUrl(category?.imageUrl);
    }
  }, [category]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setSlug(name.replace(/ /g, "-").toLowerCase());
  };

  const handlePreview = () => {
    setPreviewLoading(true);
    const inputContent = document.getElementById("content") as HTMLInputElement;
    const text = inputContent.value;
    setTextContent(text);
    setPreviewLoading(false);
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

    const category = {
      name: data.name,
      slug: slug,
      imageUrl: imageUrl,
    };
    await onSubmitForm(category);
    setIsloading(false);
    setPreviewLoading(false);
  };

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
      <form onSubmit={handleSubmit}>
        <div className="lg:grid grid-cols-2 gap-4 lg:px-10">
          <div className="  space-y-2 md:space-y-4">
            <InputForm
              label="Article Title"
              placeholder="Example : Stand Acrilic"
              name="name"
              type="text"
              onChange={(e) => handleNameChange(e)}
              defaultValue={category?.name}
            />
            <label
              htmlFor="content"
              className="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white me-2"
            >
              Content
            </label>
            <textarea
              name="content"
              id="content"
              className="w-full border-2 border-gray-700 rounded-lg p-2 h-80"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded-lg "
                onClick={() => handlePreview()}
              >
                {previewLoading ? "Loading..." : "Preview"}
              </button>
            </div>
          </div>
          <div>
            <p className="text-gray-700 ">Preview :</p>
            <div
              className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3 aspect-[1] w-full mx-auto relative p-4"
              dangerouslySetInnerHTML={{ __html: textContent }}
            ></div>
            <div className="flex justify-end items-center gap-5">
              {message && <p className="text-red-500 text-sm">{message}</p>}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                disabled={isloading}
              >
                {isloading
                  ? "Loading..."
                  : `${category.slug ? "Update" : "Create"}`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
