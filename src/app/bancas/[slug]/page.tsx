import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RegistryTable } from "@/components/RegistryTable";

export const dynamic = "force-dynamic";

export default async function BancaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const banca = await prisma.banca.findUnique({
    where: { slug },
    include: { birds: { orderBy: [{ placa: "asc" }] } },
  });

  if (!banca) notFound();

  const placaIndex: Record<string, string> = {};
  for (const b of banca.birds) placaIndex[b.placa] = b.id;

  const total = banca.birds.length;
  const vivas = banca.birds.filter((b) => b.lifeStatus !== "DECEASED").length;
  const gallos = banca.birds.filter((b) => b.sexo !== "FEMALE").length;
  const gallinas = total - gallos;

  return (
    <div className="space-y-8">
      <Link href="/bancas" className="text-sm font-semibold text-brand-crimson hover:underline">
        ← Bancas
      </Link>

      {/* Encabezado al estilo del libro de registro */}
      <header className="card overflow-hidden">
        <div className="bg-brand-grad px-6 py-7 text-center text-white sm:py-9">
          <div className="flex items-center justify-center gap-4">
            <span aria-hidden className="text-3xl">🐓</span>
            <div>
              <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
                Registro de Gallos
              </h1>
              <p className="mt-0.5 text-lg font-semibold uppercase tracking-wide text-white/90">
                {banca.name}
              </p>
            </div>
            <span aria-hidden className="text-3xl">🐓</span>
          </div>
          {(banca.location || banca.owner || banca.foundedYear) && (
            <p className="mt-3 text-sm text-white/80">
              {[banca.owner, banca.location, banca.foundedYear ? `Desde ${banca.foundedYear}` : null]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex flex-wrap gap-2">
            <MiniStat label="Aves" value={total} />
            <MiniStat label="Vivas" value={vivas} />
            <MiniStat label="Gallos" value={gallos} />
            <MiniStat label="Gallinas" value={gallinas} />
          </div>
          <Link href={`/bancas/${banca.slug}/nueva`} className="btn-primary">
            + Agregar ave
          </Link>
        </div>
      </header>

      {banca.description && (
        <p className="max-w-3xl text-brand-slate">{banca.description}</p>
      )}

      {total === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-brand-slate">Esta banca aún no tiene aves en el registro.</p>
          <Link href={`/bancas/${banca.slug}/nueva`} className="btn-primary mt-4">
            + Registrar la primera ave
          </Link>
        </div>
      ) : (
        <RegistryTable rows={banca.birds} placaIndex={placaIndex} />
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-brand-cream px-3 py-2 text-center">
      <div className="font-display text-xl font-extrabold text-brand-crimson">
        {value}
      </div>
      <div className="label">{label}</div>
    </div>
  );
}
