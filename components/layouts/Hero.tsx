"use client";

import { motion, cubicBezier } from "framer-motion";
import Countdown from "../Countdown";
import LightPillar from "../liquid-pillar/liquid-pillar";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-center">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-block mb-4 rounded-full bg-brand-orange/10 px-4 py-1 text-xs text-brand-orange"
          >
            Limited Presale Live
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-tight md:text-6xl"
          >
            Unlock Unlimited{" "}
            <span className="text-brand-orange">AI Vision</span>.
            <br /> Forever.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-brand-white/70"
          >
            One-time payment for lifetime access to ultra-premium,
            high-resolution AI-generated images. No subscriptions. Ever.
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <Countdown />
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-4">
            <a
              href="#pricing"
              className="rounded-xl bg-brand-orange px-8 py-4 text-sm font-semibold hover:bg-brand-orange/70 transition"
            >
              Claim Lifetime Access – $99
            </a>
            <span className="text-xs text-brand-white/50">
              Secure one-time payment
            </span>
          </motion.div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-3xl bg-brand-orange/20 blur-3xl"
          />

          <motion.img
            src="/images/korty.jpg"
            alt="Featured AI portrait"
            className="relative rounded-3xl border border-brand-white/10"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
