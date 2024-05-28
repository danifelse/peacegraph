"use client";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";
import CardProduct from "../Cards/CardProduct";
import SkeletonCard from "./SkeletonCard";
import { getData } from "@/services/getDataClient";
import SkeletonList from "./SkeletonList";
import SearchInput from "../Elements/SearchInput";
import Pagination from "../Elements/Pagination";
import BreadCrumb from "./BreadCrumb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ProductsContainer({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const searchByParams = searchParams.search;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(searchedProducts.length / itemsPerPage);
  useEffect(() => {
    if (searchByParams) {
      setSearch(searchByParams);
    }
  }, [searchByParams]);

  useEffect(() => {
    setTimeout(() => {
      getData("/api/categories").then((res) => setCategories(res.data.data));
    }, 100);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      getData("/api/products").then((res) => setProducts(res.data.data));
    }, 300);
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (search === "") {
      setSearchedProducts(filteredProducts);
    } else {
      const filtered = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedProducts(filtered);
    }
  }, [search, filteredProducts]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const filtered = products.filter((product) => {
        if (selectedCategories.includes(product.category)) {
          return true;
        }
        return false;
      });
      if (filtered) {
        setFilteredProducts(filtered);
      }
    } else {
      setFilteredProducts(products);
    }
  }, [products, selectedCategories]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, event.target.name]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== event.target.name)
      );
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    if (value === "") {
      setSearchedProducts(filteredProducts);
    } else {
      const filtered = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchedProducts(filtered);
    }
  };

  return (
    <div
      className="lg:-mt-28 md:-mt-40 -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative "
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      <div className="bg-white  rounded-lg grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 ">
        <div className="   rounded-lg ">
          <div className="lg:p-10 md:p-6 p-2 md:sticky md:top-20 md:max-w-sm w-full bg-whgite  rounded-lg">
            <h1 className="text-3xl text-gray-700">Category</h1>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0 ">
              {categories.length === 0 && <SkeletonList />}
              {categories &&
                categories.map((category) => (
                  <div
                    key={category.slug}
                    className={`flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 relative transition duration-500  ${
                      selectedCategories.includes(category.slug)
                        ? "bg-pink-300 -translate-x-2 -translate-y-1"
                        : "bg-pink-100"
                    }`}
                  >
                    <div className="flex items-center ">
                      <input
                        type="checkbox"
                        id={category.slug}
                        name={category.slug}
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                        value={category.slug}
                        onChange={handleFilterChange}
                      />
                      <label
                        htmlFor={category.slug}
                        className="w-full py-4 ms-2 md:text-sm text-xs font-medium text-gray-900 dark:text-gray-300 pe-10"
                      >
                        {category.name}
                        <span className="md:absolute md:right-5 px-2 py-0.5 text-xs font-medium tracking-wide text-blue-500 bg-blue-100 rounded">
                          {
                            products.filter(
                              (product) => product.category === category.slug
                            ).length
                          }
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-span-3 lg:pe-8 relative">
          <div className="md:p-4 md:mt-5 p-2 md:sticky md:top-0 lg:w-[55%] md:w-[40%] w-[80%] md:z-30 relative">
            <SearchInput
              label="Search Product"
              name="search"
              placeholder="Search Product"
              onChange={handleSearchChange}
            />
          </div>
          <div className="md:p-4 md:mt-5 p-2 absolute top-2 right-10 hidden md:flex md:gap-6 items-center ">
            <div className="flex lg:gap-2 items-center">
              <span
                className="cursor-pointer"
                onClick={() => page > 1 && setPage(page - 1)}
              >
                <IoIosArrowBack className="lg:text-2xl text-lg text-blue-400" />
              </span>
              <span className=" lg:text-base text-sm">
                Pages {page} / {totalPages}
              </span>
              <span
                className="cursor-pointer"
                onClick={() => page < totalPages && setPage(page + 1)}
              >
                <IoIosArrowForward className="lg:text-2xl text-lg text-blue-400" />
              </span>
            </div>
            <BreadCrumb links={["Products"]} />
          </div>
          {searchedProducts.length === 0 && products.length > 0 && (
            <div className="flex justify-center items-center gap-2 pt-10">
              <p className="text-gray-700 text-xl font-light  ">
                Maaf, Product yang kamu cari belum tesedia
              </p>
              <span className="text-3xl">😔</span>
            </div>
          )}
          {search.length > 0 && searchedProducts.length > 0 && (
            <div className="flex justify-center items-center gap-2 ">
              <p className="text-gray-700 text-xl font-light  ">
                Hasil pencarian &quot;{search}&quot;
              </p>
            </div>
          )}

          {searchedProducts.length === 0 && (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-4 gap-2 lg:ps-8 py-4 lg:py-8">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
          <div className="mt-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 ">
            {searchedProducts &&
              searchedProducts
                .slice(startIndex, endIndex)
                .map((product, i) => (
                  <CardProduct key={product.slug} {...product} i={i + 1} />
                ))}
          </div>
          <div className="mt-10">
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
