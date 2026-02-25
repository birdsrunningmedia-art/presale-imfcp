// PricingSection.tsx (SERVER)
import { getPricing } from "@/lib/actions/get-pricing";
import PresaleCheckoutPage from "./checkout";

export default async function CheckOutSection() {
  const pricing = await getPricing();

  return <PresaleCheckoutPage pricing={pricing} />;
}
