import Link from "next/link";
import { isAlive, sexLabel } from "@/lib/format";

export type RegistryRow = {
  id: string;
  placa: string;
  placaPadre: string | null;
  placaMadre: string | null;
  sexo: string;
  color: string | null;
  cresta: string | null;
  marcaje: string | null;
  observaciones: string | null;
  lifeStatus: string;
};

// Enlace a una placa de progenitor solo si esa placa existe en la banca.
function PlacaRef({
  placa,
  index,
}: {
  placa: string | null;
  index: Record<string, string>;
}) {
  if (!placa) return <span className="text-brand-slate/50">—</span>;
  const id = index[placa];
  if (!id) return <span>{placa}</span>;
  return (
    <Link href={`/aves/${id}`} className="text-brand-crimson hover:underline">
      {placa}
    </Link>
  );
}

const TH = "px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-white/90";
const TD = "px-3 py-2 align-top text-brand-ink";

export function RegistryTable({
  rows,
  placaIndex,
}: {
  rows: RegistryRow[];
  placaIndex: Record<string, string>;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead className="bg-brand-grad">
            <tr>
              <th className={TH}>Placa No</th>
              <th className={TH}>Placa del Padre</th>
              <th className={TH}>Placa de la Madre</th>
              <th className={TH}>Sexo</th>
              <th className={TH}>Color</th>
              <th className={TH}>Cresta</th>
              <th className={TH}>Marcaje No.</th>
              <th className={TH}>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const dead = !isAlive(r.lifeStatus);
              return (
                <tr
                  key={r.id}
                  className={
                    (i % 2 ? "bg-black/[0.02] " : "bg-white ") +
                    "border-t border-black/5 hover:bg-brand-crimson/5"
                  }
                >
                  <td className={TD}>
                    <Link
                      href={`/aves/${r.id}`}
                      className="inline-flex items-center gap-1.5 font-display font-bold text-brand-crimson hover:underline"
                    >
                      <span
                        aria-hidden
                        title={dead ? "Difunto" : "Vivo"}
                        className={
                          "inline-block h-2 w-2 rounded-full " +
                          (dead ? "bg-brand-slate/50" : "bg-emerald-500")
                        }
                      />
                      {r.placa}
                    </Link>
                  </td>
                  <td className={TD}>
                    <PlacaRef placa={r.placaPadre} index={placaIndex} />
                  </td>
                  <td className={TD}>
                    <PlacaRef placa={r.placaMadre} index={placaIndex} />
                  </td>
                  <td className={TD}>{sexLabel(r.sexo)}</td>
                  <td className={TD}>{r.color || "—"}</td>
                  <td className={TD}>{r.cresta || "—"}</td>
                  <td className={TD}>{r.marcaje || "—"}</td>
                  <td className={TD + " max-w-[220px]"}>
                    {r.observaciones || (
                      <span className="text-brand-slate/50">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
