"use server";

import { headers } from "next/headers";

type Pricing = {
  currency: "NGN" | "USD";
  amount: number;
  symbol: string;
};

export async function getPricing(): Promise<Pricing> {
  const headersList = await headers();
  const country = headersList.get("x-user-country") ?? "US";

  if (country === "NG") {
    return {
      currency: "NGN",
      amount: 10000,
      symbol: "₦",
    };
  }

  return {
    currency: "USD",
    amount: 8,
    symbol: "$",
  };
}