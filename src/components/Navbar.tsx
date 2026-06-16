import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-brand-cream/80 backdrop-blur">
      <nav className="container-tg flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-grad text-lg shadow-glow">
            🐓
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-brand-ink">
            Tu<span className="text-brand-crimson">Gallo</span>
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-brand-ink/70 hover:bg-black/5 hover:text-brand-ink"
          >
            Inicio
          </Link>
          <Link
            href="/bancas"
            className="rounded-lg px-3 py-2 text-brand-ink/70 hover:bg-black/5 hover:text-brand-ink"
          >
            Bancas
          </Link>
          <Link href="/bancas/nueva" className="btn-primary ml-2 px-4 py-2 text-sm">
            + Nueva banca
          </Link>
        </div>
      </nav>
    </header>
  );
}
