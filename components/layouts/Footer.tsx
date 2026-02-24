"use client";

import { motion, cubicBezier } from "framer-motion";

const footerVariant = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: cubicBezier(0.22, 1, 0.36, 1),
      delay: 1.0, // 🔹 delayed entrance after page content
    },
  },
};

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-white/5 py-10 text-center text-xs text-white/40"
      variants={footerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      © 2026 Image for creatives. Built for creators.
    </motion.footer>
  );
}
