import Footer from "@/components/Layouts/Footer";
import Navbar from "@/components/Layouts/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Peacegraph",
  description: "Solusi percetakan digital",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
