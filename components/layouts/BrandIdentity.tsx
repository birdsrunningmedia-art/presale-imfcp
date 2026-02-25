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
            For too long, African creators have been forced to navigate a
            digital landscape that fails to mirror our reality. You know the
            frustration of scouring global databases only to find images that do
            not accurately represent our culture. Even when you do stumble upon
            a visual that feels authentic, it is almost always tucked away
            behind a rigid, high-cost subscription model that feels more like a
            barrier than a resource.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-white/80 leading-relaxed text-base"
          >
            IMFC was built to dismantle those walls and reclaim the narrative.
            We have meticulously crafted a specialized library of high-fidelity
            AI imagery that finally prioritizes our culture, our aesthetics, and
            our stories. By bridging the gap between world-class technology and
            cultural resonance, we’ve created a space where you no longer have
            to compromise your vision or your budget. This isn't just a
            collection of files; it is a catalyst for a smoother, more intuitive
            creative process, allowing you to focus entirely on what matters
            most: bringing your most ambitious ideas to life without friction.
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
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
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
          This is a founders release. We’re building slowly, intentionally, and
          alongside the creators who care about quality from day one.
        </motion.p>
      </motion.div>
    </section>
  );
}
