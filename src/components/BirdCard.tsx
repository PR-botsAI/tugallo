import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { avatarGradient, initials, sexSymbol, sexLabel, isAlive } from "@/lib/format";

export type BirdCardData = {
  id: string;
  placa: string;
  sexo: string;
  color: string | null;
  cresta: string | null;
  lifeStatus: string;
  photoUrl: string | null;
};

export function BirdCard({ bird }: { bird: BirdCardData }) {
  const alive = isAlive(bird.lifeStatus);
  return (
    <Link
      href={`/aves/${bird.id}`}
      className="card group block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-glow"
    >
      <div className="relative h-36 w-full">
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
            <span className="font-display text-3xl font-extrabold text-white drop-shadow">
              {initials(bird.placa) || bird.placa.slice(0, 3)}
            </span>
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-lg bg-white/90 px-2 py-0.5 font-display text-sm font-bold text-brand-crimson">
          #{bird.placa}
        </span>
        <span className="absolute right-2 top-2">
          <StatusBadge lifeStatus={bird.lifeStatus} />
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <p className="truncate text-sm text-brand-slate">
          {[bird.color, bird.cresta].filter(Boolean).join(" · ") ||
            sexLabel(bird.sexo)}
        </p>
        <span className="text-brand-amber" title={sexLabel(bird.sexo)}>
          {sexSymbol(bird.sexo)}
        </span>
      </div>
    </Link>
  );
}
