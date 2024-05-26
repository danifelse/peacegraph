import NavbarDashboard from "@/components/Layouts/NavbarDashboard";
import Sidebar from "@/components/Layouts/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavbarDashboard />
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
