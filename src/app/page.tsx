import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeaderSection from "@/components/HeaderSection";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/CategorySection";
import TimeLineOrder from "@/components/TimeLineOrder";

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
