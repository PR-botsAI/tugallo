"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function str(fd: FormData, key: string): string | null {
  const v = fd.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

function req(fd: FormData, key: string): string {
  const v = str(fd, key);
  if (!v) throw new Error(`El campo "${key}" es obligatorio.`);
  return v;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function uniqueSlug(base: string): Promise<string> {
  const root = slugify(base) || "banca";
  let slug = root;
  let n = 2;
  while (await prisma.banca.findUnique({ where: { slug } })) {
    slug = `${root}-${n++}`;
  }
  return slug;
}

export async function createBanca(fd: FormData) {
  const name = req(fd, "name");
  const slug = await uniqueSlug(name);
  await prisma.banca.create({
    data: {
      name,
      slug,
      owner: str(fd, "owner"),
      location: str(fd, "location"),
      description: str(fd, "description"),
      foundedYear: str(fd, "foundedYear")
        ? Number(str(fd, "foundedYear"))
        : null,
    },
  });
  revalidatePath("/bancas");
  revalidatePath("/");
  redirect(`/bancas/${slug}`);
}

function deceasedFrom(fd: FormData): {
  lifeStatus: string;
  deceasedDate: Date | null;
} {
  const lifeStatus = str(fd, "lifeStatus") === "DECEASED" ? "DECEASED" : "LIVING";
  const raw = str(fd, "deceasedDate");
  const deceasedDate =
    lifeStatus === "DECEASED" && raw ? new Date(raw) : null;
  return { lifeStatus, deceasedDate };
}

export async function createBird(fd: FormData) {
  const bancaId = req(fd, "bancaId");
  const banca = await prisma.banca.findUnique({ where: { id: bancaId } });
  if (!banca) throw new Error("Banca no encontrada.");

  const { lifeStatus, deceasedDate } = deceasedFrom(fd);
  await prisma.bird.create({
    data: {
      bancaId,
      placa: req(fd, "placa"),
      placaPadre: str(fd, "placaPadre"),
      placaMadre: str(fd, "placaMadre"),
      sexo: str(fd, "sexo") === "FEMALE" ? "FEMALE" : "MALE",
      color: str(fd, "color"),
      cresta: str(fd, "cresta"),
      marcaje: str(fd, "marcaje"),
      observaciones: str(fd, "observaciones"),
      photoUrl: str(fd, "photoUrl"),
      lifeStatus,
      deceasedDate,
    },
  });
  revalidatePath(`/bancas/${banca.slug}`);
  redirect(`/bancas/${banca.slug}`);
}

export async function updateBird(fd: FormData) {
  const birdId = req(fd, "birdId");
  const existing = await prisma.bird.findUnique({
    where: { id: birdId },
    include: { banca: true },
  });
  if (!existing) throw new Error("Ave no encontrada.");

  const { lifeStatus, deceasedDate } = deceasedFrom(fd);
  await prisma.bird.update({
    where: { id: birdId },
    data: {
      placa: req(fd, "placa"),
      placaPadre: str(fd, "placaPadre"),
      placaMadre: str(fd, "placaMadre"),
      sexo: str(fd, "sexo") === "FEMALE" ? "FEMALE" : "MALE",
      color: str(fd, "color"),
      cresta: str(fd, "cresta"),
      marcaje: str(fd, "marcaje"),
      observaciones: str(fd, "observaciones"),
      photoUrl: str(fd, "photoUrl"),
      lifeStatus,
      deceasedDate,
    },
  });
  revalidatePath(`/bancas/${existing.banca.slug}`);
  revalidatePath(`/aves/${birdId}`);
  redirect(`/aves/${birdId}`);
}

export async function deleteBird(fd: FormData) {
  const birdId = req(fd, "birdId");
  const existing = await prisma.bird.findUnique({
    where: { id: birdId },
    include: { banca: true },
  });
  if (!existing) redirect("/bancas");
  await prisma.bird.delete({ where: { id: birdId } });
  revalidatePath(`/bancas/${existing!.banca.slug}`);
  redirect(`/bancas/${existing!.banca.slug}`);
}
