import Header from "@/components/header";
import Scanner from "@/components/scanner";
import WasteCategories from "@/components/waste-categories";
import Dashboard from "@/components/dashboard";
import EducationalContent from "@/components/educational-content";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Scanner />
        <WasteCategories />
        <Dashboard />
        <EducationalContent />
      </main>
      <Footer />
    </div>
  );
}
