import NavbarDashboard from "@/components/Layouts/NavbarDashboard";
import Sidebar from "@/components/Layouts/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Peacegraph",
  description: "Solusi percetakan digital",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavbarDashboard />
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
