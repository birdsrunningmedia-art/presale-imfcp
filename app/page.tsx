import Navbar from "@/components/layouts/Navbar";
import Collections from "@/components/Collections";
import Hero from "@/components/layouts/Hero";
import Features from "@/components/layouts/Features";
import Pricing from "@/components/layouts/Pricing";
import Footer from "@/components/layouts/Footer";
import BrandStory from "@/components/layouts/BrandIdentity";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Collections />
        <BrandStory />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}