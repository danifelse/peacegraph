import ArticlesContainer from "@/components/Fragments/ArticlesContainer";
import BannerImage from "@/components/Fragments/BannerImage";

export default function Page() {
  return (
    <div className="mt-20">
      <BannerImage slug="banner-products" />
      <ArticlesContainer />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"></div>
    </div>
  );
}
