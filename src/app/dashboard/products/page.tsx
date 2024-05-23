"use client";
import DashboardCardProduct from "@/components/DashboardCardProduct";
import ModalDelete from "@/components/Modals/ModalDelete";
import { useAppSelector } from "@/lib/redux/hooks";
import { Product } from "@/models/Product";
import { deleteData } from "@/services/deleteDataClient";
import { getData } from "@/services/getDataClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const modalState = useAppSelector((state) => state.modalDelete);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getData("/api/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.category.includes(selectedCategory)
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const getCategories = async () => {
    const data = [];
    const categoriesData = await getData("/api/categories").then((res) => {
      return res.data.data;
    });
    for (const category of categoriesData) {
      data.push(category.name);
    }
    return data;
  };

  const deleteProduct = async (slug: string) => {
    console.log(`page product slug : ${slug}`);
    const res = await deleteData(`/api/products/${slug}`);
    if (res.status === 200) {
      toast.success(res.data.message);
      setProducts(products.filter((product) => product.slug !== slug));
    } else {
      toast.error(res.response.data.error);
    }
  };

  const handleFilerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCategory(value);
    if (value === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.category.includes(value)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="bg-pink-500 px-10 py-5 rounded-xl flex items-center justify-between">
          <div>
            <h1 className="text-white text-5xl mb-2">Products</h1>
            <p className="text-white  mb-1">
              {products.length} Products are available
            </p>
          </div>
          <Link href="/dashboard/products/create">
            <button className="bg-transparent  hover:bg-pink-500 text-white font-semibold hover:text-pink-700 hover:border-pink-800 py-2 px-4 border-2 border-white hover:border-transparent rounded-xl flex items-center gap-2">
              <span>
                <IoMdAddCircleOutline className="h-6 w-6" />
              </span>
              Add Product
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-3 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 mb-2">
          <div></div>
          <div></div>
          <div className="flex items-center gap-2">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleFilerChange}
            >
              <option value={""}>All category</option>
              {categories.map((category, i) => (
                <option
                  key={i}
                  value={category.toLocaleLowerCase().replace(/ /g, "-")}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        {filteredProducts.length === 0 && (
          <div className="flex items-center justify-center h-60 w-full">
            <p className="text-center text-3xl text-red-500">
              No Products Found
            </p>
          </div>
        )}
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 ">
          {filteredProducts &&
            filteredProducts.map((product: Product) => (
              <DashboardCardProduct key={product.id} {...product} />
            ))}
        </div>
      </div>

      <ModalDelete modalState={modalState} handleConfirm={deleteProduct} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
