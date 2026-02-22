export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-brand-white/5 bg-brand-black/60 backdrop-blur py-4">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <img
            src="/logo/logoOrange.svg"
            alt="Logo"
            className="h-14 w-auto"
          />


        <a
          href="#pricing"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-medium hover:bg-brand-orange/80 transition"
        >
          Get Access
        </a>
      </nav>
    </header>
  );
}