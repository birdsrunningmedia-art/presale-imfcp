import Navbar from "@/components/layouts/Navbar";
import Collections from "@/components/Collections";
import Footer from "@/components/layouts/Footer";
import BrandStory from "@/components/layouts/BrandIdentity";
import PricingSection from "@/components/layouts/PricingSection";
import HeroSection from "@/components/layouts/HeroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <HeroSection />
        <Collections />
        <BrandStory />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
