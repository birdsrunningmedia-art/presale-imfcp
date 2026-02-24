"use client";

import { motion, cubicBezier } from "framer-motion";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease,
    },
  },
};


export default function BrandStory() {
  return (
    <section className="py-32 bg-brand-black">
      <motion.div
        className="mx-auto max-w-5xl px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.span
          variants={fadeUp}
          className="text-xs uppercase tracking-widest text-brand-orange"
        >
          Our Story
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="mt-4 text-3xl md:text-4xl font-bold text-white max-w-3xl"
        >
          Built for creators who want great images — without friction.
        </motion.h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <motion.p
            variants={fadeUp}
            className="text-white/80 leading-relaxed text-base"
          >
            High-quality visuals are essential, but finding them often feels
            slower and more expensive than it should. Subscriptions pile up,
            downloads are gated, and simple workflows turn into distractions.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-white/80 leading-relaxed text-base"
          >
            We built this image delivery platform for people who value focus.
            Curated collections, fast delivery, modern formats — and one simple
            promise: pay once, get lifetime access.
          </motion.p>
        </div>

        {/* Values */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Curated by design",
              desc: "Every image earns its place. No filler, no endless scrolling.",
            },
            {
              title: "Speed first",
              desc: "Optimized delivery so visuals never slow your workflow.",
            },
            {
              title: "Ownership over subscriptions",
              desc: "One payment. No recurring fees. No surprises.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={card}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease }}
              className="rounded-2xl border border-white/10
                         bg-brand-black p-6"
            >
              <h3 className="text-white font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          variants={fadeUp}
          className="mt-14 max-w-2xl text-sm text-white/60"
        >
          This is a founders release. We’re building slowly, intentionally,
          and alongside the creators who care about quality from day one.
        </motion.p>
      </motion.div>
    </section>
  );
}
