// PricingSection.tsx (SERVER)
import { getPricing } from "@/lib/actions/get-pricing";
import Hero from "./Hero";

export default async function HeroSection() {
  const pricing = await getPricing();

  return <Hero pricing={pricing} />;
}