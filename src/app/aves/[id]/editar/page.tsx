import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateBird } from "@/app/actions";
import { BirdFormFields } from "@/components/BirdFormFields";

export const dynamic = "force-dynamic";

export default async function EditarAvePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bird = await prisma.bird.findUnique({
    where: { id },
    include: { banca: { select: { name: true, slug: true } } },
  });
  if (!bird) notFound();

  const others = await prisma.bird.findMany({
    where: { bancaId: bird.bancaId, NOT: { id: bird.id } },
    select: { placa: true },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href={`/aves/${bird.id}`}
        className="text-sm font-semibold text-brand-crimson hover:underline"
      >
        ← Placa #{bird.placa}
      </Link>
      <h1 className="font-display text-3xl font-extrabold">Editar ave</h1>
      <p className="text-brand-slate">{bird.banca.name}</p>

      <form action={updateBird} className="card space-y-4 p-6">
        <input type="hidden" name="birdId" value={bird.id} />
        <BirdFormFields bird={bird} placas={others.map((o) => o.placa)} />
        <div className="flex justify-end gap-3 pt-2">
          <Link href={`/aves/${bird.id}`} className="btn-ghost">
            Cancelar
          </Link>
          <button type="submit" className="btn-primary">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
