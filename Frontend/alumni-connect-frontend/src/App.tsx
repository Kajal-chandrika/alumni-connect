import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import RoutesIndex from "./routes";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 flex gap-6">
        <Sidebar />
        <main className="flex-1 min-h-[calc(100vh-56px)] pt-6">
          <RoutesIndex />
          <Footer />
        </main>
      </div>
    </div>
  );
}
