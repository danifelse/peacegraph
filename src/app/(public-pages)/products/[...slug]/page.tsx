"use client";
import CardProduct from "@/components/Cards/CardProduct";
import BreadCrumb from "@/components/Fragments/BreadCrumb";
import OrderSection from "@/components/Fragments/OrderSection";
import SkeletonCard from "@/components/Fragments/SkeletonCard";
import SkeletonImages from "@/components/Fragments/SkeletonImages";
import SkeletonList from "@/components/Fragments/SkeletonList";
import { useGetData } from "@/lib/swr/hooks";
import { Product } from "@/models/Product";
import { useEffect } from "react";

export default function DetailProducts({
  params,
}: {
  params: { slug: string[] };
}) {
  const categorySlug = params.slug[0];
  const productSlug = params.slug[1];
  const productsData = useGetData("api/products");
  const products: Product[] = productsData?.data?.data;
  let productsRel;
  let product: any;
  if (products) {
    product = products.filter(
      (product: Product) => product.slug === productSlug
    )[0];

    productsRel = products.filter((p) => p.category === product?.category);
  }

  useEffect(() => {
    if (product) {
      document.title = `${product?.category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char: string) => char.toUpperCase())} - ${
        product?.name
      }`;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );

      if (metaDescription) {
        metaDescription.setAttribute("content", product?.description);
      } else {
        const newMetaDescription = document.createElement("meta");
        newMetaDescription.name = "description";
        newMetaDescription.content = product?.description;
        document.head.appendChild(newMetaDescription);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" lg:flex gap-4  lg:h-96 mb-10">
          <div className="lg:w-1/2 w-full">
            <SkeletonImages />
          </div>
          <div className="lg:w-1/2 w-full">
            <SkeletonList />
          </div>
        </div>
        <div className="mt-10 grid lg:grid-cols-5 gap-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 dark:bg-gray-800 py-8">
      <div className="bg-gradient-to-r from-pink-300  to-pink-500  dark:bg-gray-700 h-60">
        <div className="max-w-7xl mx-auto px-8 p-6 lg:p-8">
          <div className="">
            <BreadCrumb links={["Products", product.name]} />
          </div>
          {product.category && (
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-10">
              {product?.category
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char: string) => char.toUpperCase())}{" "}
              - {product.name}
            </h2>
          )}
        </div>
      </div>
      <div className=" max-w-7xl mx-auto px-8 sm:p-6 lg:p-8 ">
        <div className="-mt-28 lg:-mt-32 relative bg-white lg:p-12 p-8 shadow-lg rounded-lg dark:bg-gray-800">
          <div className="flex flex-col md:flex-row -mx-4 ">
            <div className="md:flex-1 px-4">
              <div className=" rounded-lg overflow-hidden shadow-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover aspect-square "
                  src={product.imageUrl}
                  alt="Product Image"
                />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product.name}
              </h2>

              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300 me-2">
                  Harga:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product?.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Stok:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {" "}
                  Tersedia
                </span>
              </div>

              <div className="mb-4">
                <p>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Kategori :
                    <span className="text-gray-600 dark:text-gray-300">
                      {" "}
                      {product?.category
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (char: string) => char.toUpperCase())}
                    </span>
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Deskripsi Produk:
                </span>
                <p className="text-gray-600 dark:text-gray-300  mt-2">
                  {product?.description}
                </p>
              </div>
              <OrderSection product={product} />
              {/* <div className="flex -mx-2 mb-4 mt-4 ">
                <div className="w-1/2 px-2">
                  <a
                    href="https://wa.me/628118811647"
                    className="w-full bg-pink-600 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-pink-800 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                  >
                    Pesan
                    <span>
                      <FaWhatsapp className="w-6 h-6" />
                    </span>
                  </a>
                </div>
                <div className="w-1/2 px-2">
                  <Link
                    href="/products"
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
                  >
                    <span>
                      <FaArrowLeftLong />
                    </span>
                    Kembali
                  </Link>
                </div>
              </div>
              <div className=" mb-4 mt-4 ">
                <div>
                  <FormOrder onSubmitForm={handleOrder} product={product} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="mt-10 max-w-7xl mx-auto px-8 sm:p-6 lg:p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Produk dengan kategori serupa
          </h3>
          <div className="mt-4 grid lg:grid-cols-5">
            {productsRel &&
              productsRel
                .filter((p) => p.slug !== product.slug)
                .splice(0, 5)
                .map((product) => (
                  <div key={product.slug}>
                    <CardProduct {...product} />
                  </div>
                ))}
            {!productsRel && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </div>
        </div>
        <div className=" max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Produk lainnya
          </h3>
          <div className="mt-4 grid lg:grid-cols-5">
            {products &&
              products
                .filter((p) => p.category !== product.category)
                .splice(0, 5)
                .map((product) => (
                  <div key={product.slug}>
                    <CardProduct {...product} />
                  </div>
                ))}

            {!products && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
