
import { getPricing } from "@/lib/actions/get-pricing";

export default async function GetPricing({ type }: { type: Number }) {
  const pricing = await getPricing();
  if (type === 1) {
    return (
      <span>
        {pricing.symbol}
        {pricing.amount}
      </span>
    );
  } else {
    return (
      <>
        <p className="text-5xl font-extrabold text-white">
          {pricing.symbol}
          {pricing.amount}
        </p>
        <span className="text-sm text-brand-white/70 mb-1">
          {pricing.currency}
        </span>
      </>
    );
  }
}
