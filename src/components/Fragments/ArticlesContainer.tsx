"use client";
import { Article } from "@/models/Articles";
import { getData } from "@/services/getDataClient";
import { useEffect, useState } from "react";
import SkeletonList from "./SkeletonList";
import Skeleton from "./Skeleton";

export default function ArticlesContainer() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [indexOpen, setIndexOpen] = useState(0);
  const [sortedArticles, setSortedArticles] = useState<Article[]>([]);

  useEffect(() => {
    getData("/api/articles").then((res) => setArticles(res.data.data));
  }, []);

  useEffect(() => {
    setSortedArticles(articles.sort((a, b) => a.order - b.order));
  }, [articles]);

  return (
    <div className="lg:-mt-28 md:-mt-40 -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
      <div className="bg-white shadow-lg  rounded-lg grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 ">
        <div className="   rounded-lg ">
          <div className=" md:sticky md:top-20 md:max-w-sm w-full bg-whgite  rounded-lg">
            <div className="mt-4 lg:px-10 lg:pt-4 md:px-6 md:pt-2 ">
              <h1 className="text-3xl text-gray-700 ">Article</h1>
            </div>
            <div className=" lg:px-10 lg:py-4 md:px-6 md:py-2 p-2  grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0  max-h-screen overflow-y-auto">
              <div className="space-y-2 ">
                {sortedArticles.length === 0 && (
                  <div className="px-3 py-2 rounded-lg overflow-y-auto">
                    <SkeletonList />
                  </div>
                )}
                {sortedArticles.map((article, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-lg cursor-pointer transition duration-300 ${
                      indexOpen === i
                        ? "-translate-x-2 bg-pink-500 text-white shadow-md"
                        : "  bg-pink-200 hover:-translate-x-2"
                    }`}
                    onClick={() => setIndexOpen(i)}
                  >
                    <p>{article.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 lg:px-12 relative py-12 shadow-md min-h-screen ">
          {sortedArticles.length === 0 && (
            <div>
              <SkeletonList />
            </div>
          )}
          <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{
              __html: sortedArticles[indexOpen]?.content,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
