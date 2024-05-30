import BannerImage from "@/components/Fragments/BannerImage";
import ProductsContainer from "@/components/Fragments/ProductsContainer";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div className="mt-20">
      <BannerImage slug="banner-products" />
      <ProductsContainer searchParams={searchParams} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"></div>
    </div>
  );
}
