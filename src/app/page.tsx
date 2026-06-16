import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [bancaCount, birdCount, livingCount, bancas] = await Promise.all([
    prisma.banca.count(),
    prisma.bird.count(),
    prisma.bird.count({ where: { lifeStatus: "LIVING" } }),
    prisma.banca.findMany({
      orderBy: { name: "asc" },
      take: 6,
      include: { _count: { select: { birds: true } } },
    }),
  ]);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-brand-grad p-8 text-white shadow-glow sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-10 select-none text-[200px] leading-none opacity-20"
        >
          🐓
        </div>
        <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
          Puerto Rico
        </p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          El registro digital de tu banca y su linaje
        </h1>
        <p className="mt-4 max-w-2xl text-white/90">
          El mismo &ldquo;Registro de Gallos&rdquo; de siempre — placa, padre,
          madre, color y cresta — ahora digital, buscable y para siempre. Honra
          a las aves que están contigo y a las que ya partieron.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/bancas"
            className="btn bg-white px-5 py-2.5 font-semibold text-brand-crimson hover:bg-white/90"
          >
            Ver bancas
          </Link>
          <Link
            href="/bancas/nueva"
            className="btn border border-white/40 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
          >
            + Crear banca
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        <Stat label="Bancas" value={bancaCount} />
        <Stat label="Aves registradas" value={birdCount} />
        <Stat label="Vivas" value={livingCount} />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-extrabold">Bancas</h2>
          <Link href="/bancas" className="text-sm font-semibold text-brand-crimson hover:underline">
            Ver todas →
          </Link>
        </div>
        {bancas.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bancas.map((b) => (
              <BancaCard key={b.id} banca={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-5 text-center">
      <div className="bg-brand-grad bg-clip-text font-display text-3xl font-extrabold text-transparent">
        {value}
      </div>
      <div className="label mt-1">{label}</div>
    </div>
  );
}

function BancaCard({
  banca,
}: {
  banca: { slug: string; name: string; location: string | null; _count: { birds: number } };
}) {
  return (
    <Link
      href={`/bancas/${banca.slug}`}
      className="card block p-5 transition hover:-translate-y-0.5 hover:shadow-glow"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-grad text-xl shadow-glow">
          🐓
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-bold text-brand-ink">
            {banca.name}
          </h3>
          <p className="truncate text-sm text-brand-slate">
            {banca.location || "Puerto Rico"}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm">
        <span className="font-bold text-brand-crimson">{banca._count.birds}</span>{" "}
        aves registradas
      </p>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="card p-8 text-center">
      <p className="text-brand-slate">
        Aún no hay bancas registradas.
      </p>
      <Link href="/bancas/nueva" className="btn-primary mt-4">
        + Crear la primera banca
      </Link>
    </div>
  );
}
