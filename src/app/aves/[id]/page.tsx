import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StatusBadge, SexBadge } from "@/components/StatusBadge";
import { BirdCard } from "@/components/BirdCard";
import { deleteBird } from "@/app/actions";
import { avatarGradient, initials, fmtDate, isAlive } from "@/lib/format";

export const dynamic = "force-dynamic";

function ParentCard({
  role,
  placa,
  bird,
}: {
  role: string;
  placa: string | null;
  bird: { id: string; placa: string; color: string | null; lifeStatus: string } | null;
}) {
  return (
    <div className="card p-4">
      <p className="label">{role}</p>
      {placa ? (
        bird ? (
          <Link
            href={`/aves/${bird.id}`}
            className="mt-1 block font-display text-lg font-bold text-brand-crimson hover:underline"
          >
            {!isAlive(bird.lifeStatus) && <span aria-hidden>✝ </span>}#{bird.placa}
            {bird.color ? (
              <span className="ml-1 text-sm font-normal text-brand-slate">
                · {bird.color}
              </span>
            ) : null}
          </Link>
        ) : (
          <p className="mt-1 font-display text-lg font-bold text-brand-ink">
            #{placa}
            <span className="ml-1 text-xs font-normal text-brand-slate">
              (no registrado)
            </span>
          </p>
        )
      ) : (
        <p className="mt-1 text-sm text-brand-slate">Desconocido</p>
      )}
    </div>
  );
}

export default async function BirdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bird = await prisma.bird.findUnique({
    where: { id },
    include: { banca: true },
  });
  if (!bird) notFound();

  const parentPlacas = [bird.placaPadre, bird.placaMadre].filter(
    (p): p is string => !!p
  );

  const [parents, offspring] = await Promise.all([
    parentPlacas.length
      ? prisma.bird.findMany({
          where: { bancaId: bird.bancaId, placa: { in: parentPlacas } },
          select: { id: true, placa: true, color: true, lifeStatus: true },
        })
      : Promise.resolve([]),
    prisma.bird.findMany({
      where: {
        bancaId: bird.bancaId,
        OR: [{ placaPadre: bird.placa }, { placaMadre: bird.placa }],
      },
      orderBy: { placa: "asc" },
    }),
  ]);

  const byPlaca = new Map(parents.map((p) => [p.placa, p]));
  const padre = bird.placaPadre ? byPlaca.get(bird.placaPadre) ?? null : null;
  const madre = bird.placaMadre ? byPlaca.get(bird.placaMadre) ?? null : null;

  const alive = isAlive(bird.lifeStatus);
  const facts: { label: string; value: string | null }[] = [
    { label: "Color", value: bird.color },
    { label: "Cresta", value: bird.cresta },
    { label: "Marcaje No.", value: bird.marcaje },
    {
      label: "Fallecimiento",
      value: alive ? null : fmtDate(bird.deceasedDate) ?? "Fecha desconocida",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href={`/bancas/${bird.banca.slug}`}
          className="text-sm font-semibold text-brand-crimson hover:underline"
        >
          ← {bird.banca.name}
        </Link>
        <div className="flex gap-2">
          <Link href={`/aves/${bird.id}/editar`} className="btn-ghost px-4 py-2 text-sm">
            Editar
          </Link>
          <form action={deleteBird}>
            <input type="hidden" name="birdId" value={bird.id} />
            <button
              type="submit"
              className="btn border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
            >
              Eliminar
            </button>
          </form>
        </div>
      </div>

      <header className="grid gap-6 sm:grid-cols-[220px_1fr]">
        <div className="card h-56 overflow-hidden">
          {bird.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={bird.photoUrl}
              alt={`Placa ${bird.placa}`}
              className={"h-full w-full object-cover " + (alive ? "" : "grayscale")}
            />
          ) : (
            <div
              className="grid h-full w-full place-items-center"
              style={{ background: avatarGradient(bird.id) }}
            >
              <span className="font-display text-5xl font-extrabold text-white drop-shadow">
                {initials(bird.placa) || bird.placa}
              </span>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-extrabold">
              Placa #{bird.placa}
            </h1>
            <SexBadge sexo={bird.sexo} />
            <StatusBadge lifeStatus={bird.lifeStatus} />
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {facts
              .filter((f) => f.value)
              .map((f) => (
                <div key={f.label}>
                  <dt className="label">{f.label}</dt>
                  <dd className="text-brand-ink">{f.value}</dd>
                </div>
              ))}
          </dl>

          {bird.observaciones && (
            <div className="mt-5">
              <p className="label">Observaciones</p>
              <p className="mt-1 max-w-2xl text-brand-ink">{bird.observaciones}</p>
            </div>
          )}
        </div>
      </header>

      <section>
        <h2 className="mb-4 font-display text-2xl font-extrabold">Linaje</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <ParentCard role="Placa del Padre" placa={bird.placaPadre} bird={padre} />
          <ParentCard role="Placa de la Madre" placa={bird.placaMadre} bird={madre} />
        </div>
      </section>

      {offspring.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold">
            Descendencia <span className="text-brand-slate">({offspring.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {offspring.map((b) => (
              <BirdCard key={b.id} bird={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
