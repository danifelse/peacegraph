"use client";

import InputForm from "@/components/Elements/Input";
import { marked } from "marked";
import { useEffect, useState } from "react";

export default function FormArticle({
  article = {} as any,
  onSubmitForm,
}: {
  article?: any;
  onSubmitForm: Function;
}) {
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [textContent, setTextContent] = useState<string>("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (Object.keys(article).length) {
      setSlug(article?.title?.replace(/ /g, "-").toLowerCase());
      setTextContent(article?.content);
    }
  }, [article]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setSlug(title.replace(/ /g, "-").toLowerCase());
  };

  const handlePreview = async () => {
    setPreviewLoading(true);
    const inputContent = document.getElementById("content") as HTMLInputElement;
    if (inputContent) {
      const text = inputContent.value;
      const markedText = await marked(text); // Menunggu Promise selesai
      setTextContent(markedText);
    } else {
      console.error("Text area not found");
    }

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
    if (textContent === "") {
      setMessage("Please write something in the content field");
      setTimeout(() => {
        setIsloading(false);
        setMessage("");
      }, 2000);
      return;
    }

    const article = {
      title: data.title,
      slug: slug,
      content: textContent,
    };
    // await onSubmitForm(article);
    console.log(article);
    setIsloading(false);
    setPreviewLoading(false);
  };

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
      <form onSubmit={handleSubmit}>
        <div className="lg:grid grid-cols-1 gap-4 lg:px-10">
          <div className="  space-y-2 md:space-y-4">
            <InputForm
              label="Article Title"
              placeholder="Example : Stand Acrilic"
              name="title"
              type="text"
              onChange={(e) => handleNameChange(e)}
              defaultValue={article?.title}
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
            <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3 aspect-[2/1] w-full overflow-y-auto mx-auto relative p-4">
              {textContent.length > 0 ? (
                <div
                  className="prose max-w-full h-full overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: textContent }}
                ></div>
              ) : (
                <div className="text-gray-500  w-full h-full">
                  <p className=" ">Markdown Text Example :</p>
                  <p># Contoh Heading</p>
                  <p>
                    Ini adalah contoh teks markdown, gunakan pagar untuk
                    mencetak judul, gunakan bintang untuk membuat teks
                    **tebal**, gunakan - atau 1. 2. ... untuk membuat list
                  </p>
                  <p>## Contoh Sub Heading</p>
                  <p>list</p>
                  <p>- item</p>
                  <p>- item</p>
                  <p>list</p>
                  <p>1. item</p>
                  <p>2. item</p>
                  <div className="mt-5">
                    <p>Result :</p>
                  </div>
                  <div className="prose">
                    <h1>Heading</h1>
                    <p>
                      Ini adalah contoh teks markdown, gunakan pagar untuk
                      mencetak judul, gunakan bintang untuk membuat teks
                      <b>tebal</b>, gunakan - atau 1. 2. ... untuk membuat list
                    </p>
                    <h2>Contoh Sub Heading</h2>
                    <p>list</p>
                    <ul>
                      <li>item</li>
                      <li>item</li>
                    </ul>
                    <p>list</p>
                    <ol>
                      <li>item</li>
                      <li>item</li>
                    </ol>
                  </div>
                </div>
              )}
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
                  : `${article.slug ? "Update" : "Create"}`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}