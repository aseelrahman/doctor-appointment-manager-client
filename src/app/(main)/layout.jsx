import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
