import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Fragments/Header";
import Navbar from "@/components/Layouts/Navbar";
import TimeLineOrder from "@/components/Fragments/TimeLineOrder";
import HeaderSection from "@/components/Fragments/HeaderSection";
import ProductSection from "@/components/Fragments/ProductSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <HeaderSection />
      <ProductSection />
      <TimeLineOrder />
      <Footer />
    </div>
  );
}
