import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Fragments/Header";
import Navbar from "@/components/Layouts/Navbar";
import TimeLineOrder from "@/components/Fragments/TimeLineOrder";
import CategorySection from "@/components/Fragments/CategorySection";
import HeaderSection from "@/components/Fragments/HeaderSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <HeaderSection />
      <CategorySection />
      <TimeLineOrder />
      <Footer />
    </div>
  );
}
