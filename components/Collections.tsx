"use client";

import { useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const collections = [
  { title: "Miles", img: "/images/miles.jpg" },
  { title: "Korty in a car", img: "/images/korty-car.jpg" },
  { title: "Korty black and white", img: "/images/kory-black-and-white.jpg" },
  { title: "Cute girl", img: "/images/cute-girl.jpg" },
  { title: "Korty Couch", img: "/images/korty-couch.jpg" },
  { title: "Korty", img: "/images/korty.jpg" },
];

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
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease },
  },
};

export default function Collections() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = dir === "left" ? -320 : 320;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <motion.section
      className="py-28"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-white">
              Explore the Universe
            </h2>
            <p className="text-sm text-brand-white/70 mt-1">
              Curated collections built for modern creators
            </p>
          </div>

          {/* Controls */}
          <motion.div variants={fadeUp} className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center
                         rounded-full border border-brand-white/30
                         bg-brand-orange/20 backdrop-blur
                         text-white hover:bg-brand-orange/30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center
                         rounded-full border border-brand-white/30
                         bg-brand-orange/20 backdrop-blur
                         text-white hover:bg-brand-orange/30"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </motion.div>

        {/* Frame */}
        <motion.div
          variants={fadeUp}
          className="relative rounded-[28px] p-[1px]
                     bg-gradient-to-br from-brand-orange to-brand-white
                     shadow-[0_0_70px_rgba(244,104,61,0.35)]"
        >
          {/* Carousel */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth
                       rounded-[27px] bg-brand-orange/10
                       p-6 backdrop-blur-xl
                       scrollbar-hide"
          >
            {collections.map((c) => (
              <motion.div
                key={c.title}
                variants={card}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease }}
                className="group relative min-w-[280px] h-[360px]
                           overflow-hidden rounded-2xl
                           border border-brand-white/20"
              >
                {/* Image */}
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Title */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-lg font-semibold text-white">
                    {c.title}
                  </h3>
                  <span className="text-xs text-brand-white/70">
                    Premium image collection
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
