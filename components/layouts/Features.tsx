const features = [
  {
    title: "Ultra High Definition",
    desc: "All images delivered in 4K resolution.",
  },
  {
    title: "Commercial Rights",
    desc: "Use images for client work, ads, and products.",
  },
  {
    title: "Prompt Intelligence",
    desc: "See exact prompts used to generate each image.",
  },
];

export default function Features() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Creators Choose Us
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}