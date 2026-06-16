import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createBird } from "@/app/actions";
import { BirdFormFields } from "@/components/BirdFormFields";

export const dynamic = "force-dynamic";

export default async function NuevaAvePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const banca = await prisma.banca.findUnique({
    where: { slug },
    select: { id: true, name: true, slug: true, birds: { select: { placa: true } } },
  });
  if (!banca) notFound();

  const placas = banca.birds.map((b) => b.placa);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/bancas/${banca.slug}`}
        className="text-sm font-semibold text-brand-crimson hover:underline"
      >
        ← {banca.name}
      </Link>
      <h1 className="font-display text-3xl font-extrabold">Agregar ave</h1>

      <form action={createBird} className="card space-y-4 p-6">
        <input type="hidden" name="bancaId" value={banca.id} />
        <BirdFormFields placas={placas} />
        <div className="flex justify-end gap-3 pt-2">
          <Link href={`/bancas/${banca.slug}`} className="btn-ghost">
            Cancelar
          </Link>
          <button type="submit" className="btn-primary">
            Guardar ave
          </button>
        </div>
      </form>
    </div>
  );
}
