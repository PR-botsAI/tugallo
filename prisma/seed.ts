import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.bird.deleteMany();
  await prisma.banca.deleteMany();

  // Banca Josué López (la del registro físico)
  const josue = await prisma.banca.create({
    data: {
      name: "Banca Josué López",
      slug: "josue-lopez",
      owner: "Josué López",
      location: "Puerto Rico",
      foundedYear: 2015,
      description:
        "Banca familiar. Registro de aves de cría con su placa, linaje, color y cresta.",
    },
  });

  // Linaje rastreado por placa, igual que en el libro.
  const josueBirds = [
    {
      placa: "001",
      sexo: "MALE",
      color: "Giro",
      cresta: "Sencilla",
      marcaje: "M-01",
      lifeStatus: "DECEASED",
      deceasedDate: new Date("2021-05-10"),
      observaciones: "Padrote fundador de la banca.",
    },
    {
      placa: "002",
      sexo: "FEMALE",
      color: "Canela",
      cresta: "De rosa",
      marcaje: "M-02",
      lifeStatus: "DECEASED",
      deceasedDate: new Date("2022-01-20"),
      observaciones: "Gallina madre principal.",
    },
    {
      placa: "045",
      placaPadre: "001",
      placaMadre: "002",
      sexo: "MALE",
      color: "Giro",
      cresta: "Sencilla",
      marcaje: "M-45",
      lifeStatus: "LIVING",
      observaciones: "Reproductor activo.",
    },
    {
      placa: "046",
      placaPadre: "001",
      placaMadre: "002",
      sexo: "FEMALE",
      color: "Canela",
      cresta: "De rosa",
      marcaje: "M-46",
      lifeStatus: "LIVING",
    },
    {
      placa: "050",
      placaPadre: "045",
      placaMadre: "046",
      sexo: "MALE",
      color: "Pinto",
      cresta: "De arveja",
      marcaje: "M-50",
      lifeStatus: "LIVING",
    },
    {
      placa: "051",
      placaPadre: "045",
      placaMadre: "046",
      sexo: "MALE",
      color: "Colorado",
      cresta: "Sencilla",
      marcaje: "M-51",
      lifeStatus: "LIVING",
    },
    {
      placa: "052",
      placaPadre: "045",
      placaMadre: "046",
      sexo: "FEMALE",
      color: "Jabao",
      cresta: "De rosa",
      marcaje: "M-52",
      lifeStatus: "LIVING",
    },
  ];

  for (const b of josueBirds) {
    await prisma.bird.create({ data: { ...b, bancaId: josue.id } });
  }

  // Segunda banca de ejemplo
  const montana = await prisma.banca.create({
    data: {
      name: "Criadero La Montaña",
      slug: "la-montana",
      owner: "Familia Santiago",
      location: "Cidra, P.R.",
      foundedYear: 2010,
    },
  });

  const montanaBirds = [
    {
      placa: "100",
      sexo: "MALE",
      color: "Colorado",
      cresta: "De nuez",
      lifeStatus: "DECEASED",
      deceasedDate: new Date("2020-09-01"),
      observaciones: "Línea Hatch.",
    },
    {
      placa: "101",
      sexo: "FEMALE",
      color: "Blanco",
      cresta: "Sencilla",
      lifeStatus: "LIVING",
    },
    {
      placa: "112",
      placaPadre: "100",
      placaMadre: "101",
      sexo: "MALE",
      color: "Colorado",
      cresta: "De nuez",
      lifeStatus: "LIVING",
    },
  ];

  for (const b of montanaBirds) {
    await prisma.bird.create({ data: { ...b, bancaId: montana.id } });
  }

  const total = await prisma.bird.count();
  console.log(`Seed listo: 2 bancas, ${total} aves.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
