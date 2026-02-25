// PricingSection.tsx (SERVER)
import { getPricing } from "@/lib/actions/get-pricing";
import Pricing from "./Pricing";

export default async function PricingSection() {
  const pricing = await getPricing();

  return <Pricing pricing={pricing} />;
}