// Helpers de presentación. Toda la interfaz está en español (Puerto Rico).

export function sexLabel(sexo: string): string {
  return sexo === "FEMALE" ? "Gallina" : "Gallo";
}

export function sexSymbol(sexo: string): string {
  return sexo === "FEMALE" ? "♀" : "♂";
}

export function isAlive(lifeStatus: string): boolean {
  return lifeStatus !== "DECEASED";
}

export function lifeLabel(lifeStatus: string): string {
  return lifeStatus === "DECEASED" ? "Difunto" : "Vivo";
}

export function fmtDate(d: Date | string | null | undefined): string | null {
  if (!d) return null;
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("es-PR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Valores comunes para autocompletar en los formularios.
export const CRESTAS = [
  "Sencilla",
  "De arveja",
  "De rosa",
  "De nuez",
  "De fresa",
];

export const COLORES = [
  "Giro",
  "Canela",
  "Colorado",
  "Pinto",
  "Blanco",
  "Negro",
  "Cenizo",
  "Indio",
  "Jabao",
  "Gallino",
];

// Placeholder de foto: degradado determinista + iniciales, sin depender de
// imágenes externas.
export function avatarGradient(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  const h2 = (h + 40) % 360;
  return `linear-gradient(135deg, hsl(${h} 70% 52%), hsl(${h2} 75% 42%))`;
}

export function initials(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
