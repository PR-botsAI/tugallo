import { lifeLabel, isAlive } from "@/lib/format";

export function StatusBadge({ lifeStatus }: { lifeStatus: string }) {
  const alive = isAlive(lifeStatus);
  return (
    <span
      className={
        "pill " +
        (alive
          ? "bg-emerald-100 text-emerald-700"
          : "bg-brand-ink/10 text-brand-slate")
      }
      title={alive ? "Esta ave está viva" : "Esta ave ya no está con nosotros"}
    >
      <span aria-hidden>{alive ? "●" : "✝"}</span>
      {lifeLabel(lifeStatus)}
    </span>
  );
}

export function SexBadge({ sexo }: { sexo: string }) {
  const female = sexo === "FEMALE";
  return (
    <span
      className={
        "pill " +
        (female ? "bg-fuchsia-100 text-fuchsia-700" : "bg-amber-100 text-amber-700")
      }
    >
      {female ? "♀ Gallina" : "♂ Gallo"}
    </span>
  );
}
