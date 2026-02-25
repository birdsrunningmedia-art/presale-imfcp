"use client";

import { motion, cubicBezier } from "framer-motion";
import { Button } from "../ui/button";
import { premiumOfferings } from "@/data/data";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/utils/helpers";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const featureItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const frame = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
};

export default function Pricing({
  pricing,
}: {
  pricing: {
    symbol: string;
    amount: number;
    currency: string;
  };
}) {
  const router = useRouter();

  return (
    <section id="pricing" className="py-28">
      <motion.div
        className="mx-auto max-w-3xl px-6 text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold mb-6 text-white"
        >
          Simple. Honest. One-Time Pricing.
        </motion.h2>

        {/* Outer glow frame */}
        <motion.div
          variants={frame}
          className="relative mx-auto max-w-2xl rounded-[28px] p-[1px]
                     bg-gradient-to-br from-brand-orange via-brand-orange to-brand-white
                     shadow-[0_0_80px_rgba(244,104,61,0.5)]"
        >
          {/* Glass card */}
          <motion.div
            variants={container}
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
            <motion.div variants={fadeUp} className="flex flex-col gap-1 mb-6">
              <span className="text-xs uppercase tracking-widest text-brand-white/70">
                Founders Offer
              </span>
              <h3 className="text-xl font-semibold text-white">
                Lifetime Founders Pack
              </h3>
            </motion.div>

            {/* Price */}
            <motion.div variants={fadeUp} className="flex items-end gap-2 mb-4">
              <p className="text-5xl font-extrabold text-white">
                {pricing.symbol}
                {formatNumber(pricing.amount)}
              </p>
              <span className="text-sm text-brand-white/70 mb-1">
                {pricing.currency}
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-sm text-brand-white/80 max-w-md mb-6"
            >
              Built for professionals who need speed, quality, and scale — pay
              once, use forever.
            </motion.p>

            {/* Divider */}
            <motion.div
              variants={fadeUp}
              className="h-px w-full bg-brand-white/20 mb-6"
            />

            {/* Features */}
            <div className="flex flex-col gap-4 mb-8">
              {premiumOfferings.map((offering, index) => (
                <motion.div
                  key={index}
                  variants={featureItem}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease }}
                  className="flex gap-3 items-start"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 items-center justify-center
                               rounded-md bg-brand-white text-brand-orange"
                  >
                    <Check size={14} />
                  </span>
                  <p className="text-sm text-white leading-snug">{offering}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Button
                onClick={() => router.push("/checkout")}
                className="w-full rounded-2xl bg-brand-white py-6
                         text-brand-orange font-semibold
                         shadow-lg shadow-brand-orange/30
                         hover:bg-brand-white/90"
              >
                Get lifetime access
              </Button>
            </motion.div>

            {/* Footer hint */}
            <motion.p
              variants={fadeUp}
              className="mt-3 text-xs text-center text-brand-white/60"
            >
              One-time payment • No subscriptions • Instant access
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
