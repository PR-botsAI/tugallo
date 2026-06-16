import Link from "next/link";
import { createBanca } from "@/app/actions";

export default function NuevaBancaPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/bancas" className="text-sm font-semibold text-brand-crimson hover:underline">
        ← Bancas
      </Link>
      <h1 className="font-display text-3xl font-extrabold">Nueva banca</h1>

      <form action={createBanca} className="card space-y-4 p-6">
        <label className="block">
          <span className="label">Nombre de la banca *</span>
          <input name="name" required className="field mt-1" placeholder="Ej. Banca Josué López" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="label">Propietario</span>
            <input name="owner" className="field mt-1" />
          </label>
          <label className="block">
            <span className="label">Pueblo / Ubicación</span>
            <input name="location" className="field mt-1" placeholder="Ej. Arecibo, P.R." />
          </label>
          <label className="block">
            <span className="label">Año de fundación</span>
            <input name="foundedYear" type="number" min="1900" max="2100" className="field mt-1" />
          </label>
        </div>
        <label className="block">
          <span className="label">Descripción</span>
          <textarea name="description" rows={3} className="field mt-1 resize-y" />
        </label>
        <div className="flex justify-end gap-3 pt-2">
          <Link href="/bancas" className="btn-ghost">
            Cancelar
          </Link>
          <button type="submit" className="btn-primary">
            Crear banca
          </button>
        </div>
      </form>
    </div>
  );
}
