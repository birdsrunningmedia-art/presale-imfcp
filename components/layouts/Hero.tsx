import Countdown from "../Countdown";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-center">
        
        {/* Copy */}
        <div>
          <span className="inline-block mb-4 rounded-full bg-brand-orange/10 px-4 py-1 text-xs text-brand-orange">
            Limited Presale Live
          </span>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Unlock Unlimited <span className="text-brand-orange">AI Vision</span>.
            <br /> Forever.
          </h1>

          <p className="mt-6 max-w-xl text-brand-white/70">
            One-time payment for lifetime access to ultra-premium,
            high-resolution AI-generated images. No subscriptions. Ever.
          </p>

          <div className="mt-8">
            <Countdown />
          </div>

          <div className="mt-10 flex items-center gap-4">
            <a
              href="#pricing"
              className="rounded-xl bg-brand-orange px-8 py-4 text-sm font-semibold hover:bg-brand-orange/70 transition"
            >
              Claim Lifetime Access – $99
            </a>
            <span className="text-xs text-brand-white/50">
              Secure one-time payment
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-brand-orange/20 blur-3xl" />
          <img
            src="/images/korty.jpg"
            alt="Featured AI portrait"
            className="relative rounded-3xl border border-brand-white/10"
          />
        </div>
      </div>
    </section>
  );
}