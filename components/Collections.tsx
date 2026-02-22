"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const collections = [
  { title: "Miles", img: "/images/miles.jpg" },
  { title: "Korty in a car", img: "/images/korty-car.jpg" },
  { title: "Korty black and white", img: "/images/kory-black-and-white.jpg" },
  { title: "Cute girl", img: "/images/cute-girl.jpg" },
  { title: "Korty Couch", img: "/images/korty-couch.jpg" },
  { title: "Korty", img: "/images/korty.jpg" },

];


export default function Collections() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = dir === "left" ? -320 : 320;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Explore the Universe
            </h2>
            <p className="text-sm text-brand-white/70 mt-1">
              Curated collections built for modern creators
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
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
          </div>
        </div>

        {/* Frame */}
        <div
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
              <div
                key={c.title}
                className="group relative min-w-[280px] h-[360px]
                           overflow-hidden rounded-2xl
                           border border-brand-white/20"
              >
                {/* Image */}
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover
                             transition duration-500
                             group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0
                                bg-gradient-to-t
                                from-black/70 via-black/20 to-transparent" />

                {/* Title */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-lg font-semibold text-white">
                    {c.title}
                  </h3>
                  <span className="text-xs text-brand-white/70">
                    Premium image collection
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}