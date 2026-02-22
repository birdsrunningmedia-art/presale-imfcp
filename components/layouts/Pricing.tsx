'use client'
import { Button } from "../ui/button";
import { premiumOfferings } from "@/data/data";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const router = useRouter();
  return (
    <section id="pricing" className="py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Simple. Honest. One-Time Pricing.
        </h2>

        {/* Outer glow frame */}
        <div
          className="relative mx-auto max-w-2xl rounded-[28px] p-[1px]
                     bg-gradient-to-br from-brand-orange via-brand-orange to-brand-white
                     shadow-[0_0_80px_rgba(244,104,61,0.5)]"
        >
          {/* Glass card */}
          <div
            className="relative rounded-[27px] p-10
                       bg-brand-orange/20 backdrop-blur-2xl
                       border border-brand-white/30"
          >
            {/* subtle shine */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[27px]
                            bg-gradient-to-br from-white/10 via-transparent to-transparent"
            />

            {/* Header */}
            <div className="flex flex-col gap-1 mb-6">
              <span className="text-xs uppercase tracking-widest text-brand-white/70">
                Founders Offer
              </span>
              <h3 className="text-xl font-semibold text-white">
                Lifetime Founders Pack
              </h3>
            </div>

            {/* Price */}
            <div className="flex items-end gap-2 mb-4">
              <p className="text-5xl font-extrabold text-white">$8</p>
              <span className="text-sm text-brand-white/70 mb-1">USD</span>
            </div>

            {/* Description */}
            <p className="text-sm text-brand-white/80 max-w-md mb-6">
              Built for professionals who need speed, quality, and scale — pay
              once, use forever.
            </p>

            {/* Divider */}
            <div className="h-px w-full bg-brand-white/20 mb-6" />

            {/* Features */}
            <div className="flex flex-col gap-4 mb-8">
              {premiumOfferings.map((offering, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span
                    className="mt-0.5 flex h-5 w-5 items-center justify-center
                               rounded-md bg-brand-white text-brand-orange"
                  >
                    <Check size={14} />
                  </span>
                  <p className="text-sm text-white leading-snug">{offering}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button
              onClick={() => {
                router.push("/checkout");
              }}
              className="w-full rounded-2xl bg-brand-white py-6
                         text-brand-orange font-semibold
                         shadow-lg shadow-brand-orange/30
                         hover:bg-brand-white/90"
            >
              Get lifetime access
            </Button>

            {/* Footer hint */}
            <p className="mt-3 text-xs text-center text-brand-white/60">
              One-time payment • No subscriptions • Instant access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
