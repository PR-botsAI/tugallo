import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BancasPage() {
  const bancas = await prisma.banca.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { birds: true } } },
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Bancas & Criaderos</h1>
          <p className="mt-1 text-brand-slate">
            Cada banca guarda su registro de aves y el linaje que las define.
          </p>
        </div>
        <Link href="/bancas/nueva" className="btn-primary">
          + Nueva banca
        </Link>
      </header>

      {bancas.length === 0 ? (
        <div className="card p-8 text-center text-brand-slate">
          Aún no hay bancas.{" "}
          <Link href="/bancas/nueva" className="font-semibold text-brand-crimson">
            Crea la primera
          </Link>
          .
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bancas.map((b) => (
            <Link
              key={b.id}
              href={`/bancas/${b.slug}`}
              className="card block p-5 transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-grad text-xl shadow-glow">
                  🐓
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-lg font-bold text-brand-ink">
                    {b.name}
                  </h3>
                  <p className="truncate text-sm text-brand-slate">
                    {b.location || "Puerto Rico"}
                  </p>
                </div>
              </div>
              {b.owner && (
                <p className="mt-3 text-sm text-brand-slate">
                  Propietario: {b.owner}
                </p>
              )}
              <p className="mt-3 text-sm">
                <span className="font-bold text-brand-crimson">
                  {b._count.birds}
                </span>{" "}
                aves
                {b.foundedYear ? ` · desde ${b.foundedYear}` : ""}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
