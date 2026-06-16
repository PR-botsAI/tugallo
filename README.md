# TuGallo

Versión digital del **"Registro de Gallos"** de las bancas y criaderos de
Puerto Rico. Reproduce el libro físico —placa, placa del padre, placa de la
madre, sexo, color, cresta, marcaje y observaciones— y añade el estado de cada
ave (**vivo / difunto**), búsqueda de linaje y descendencia.

> Registro cultural y genealógico de líneas de sangre y aves de cría.
> **No** organiza, puntúa ni promueve peleas de ningún tipo.

## Stack

- **Next.js 15** (App Router) + TypeScript + **Server Actions** (alta/edición/borrado)
- **Tailwind CSS** (tema vibrante, claro)
- **Prisma** ORM sobre **SQLite** (sin configuración para desarrollo local)

## Empezar

```bash
npm install          # instala dependencias
npm run db:push      # crea la base de datos
npm run db:seed      # carga datos de ejemplo (Banca Josué López + otra)
npm run dev          # http://localhost:3000
```

### Comandos

| Comando             | Qué hace                                          |
| ------------------- | ------------------------------------------------- |
| `npm run db:push`   | Aplica el esquema a la base de datos              |
| `npm run db:seed`   | Carga datos de ejemplo                            |
| `npm run db:studio` | Abre Prisma Studio para ver/editar datos          |
| `npm run build`     | Compila para producción                           |

> Para empezar de cero borra `prisma/dev.db` y vuelve a correr `db:push` + `db:seed`.

## Cómo funciona

- **Banca** — la banca/criadero: nombre, propietario, ubicación, año.
- **Bird (Ave)** — los campos del libro: `placa`, `placaPadre`, `placaMadre`,
  `sexo` (Gallo/Gallina), `color`, `cresta`, `marcaje`, `observaciones`, más
  `lifeStatus` (Vivo/Difunto) con fecha de fallecimiento opcional y foto.
- **Linaje por placa** — `placaPadre`/`placaMadre` apuntan a la placa de los
  progenitores. Si esa placa existe en la banca, la app la convierte en un
  enlace; si no, la muestra como referencia (ave no registrada). La
  descendencia se calcula buscando aves cuyo padre o madre sea esta placa.

### Páginas

- `/` — portada con resumen.
- `/bancas` y `/bancas/nueva` — listado y alta de bancas.
- `/bancas/[slug]` — el registro de la banca, en tabla igual que el libro.
- `/bancas/[slug]/nueva` — alta de ave.
- `/aves/[id]` y `/aves/[id]/editar` — detalle, linaje, descendencia y edición.

## Despliegue

Esta app es **dinámica** (Server Components + Server Actions + base de datos),
así que necesita un servidor — no funciona como sitio estático puro.

### Opción recomendada: Vercel + Postgres (mantiene TODAS las funciones)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PR-botsAI/tugallo)

1. Conecta este repositorio en [vercel.com/new](https://vercel.com/new).
2. Añade una base de datos Postgres gratis (Vercel Postgres o
   [Neon](https://neon.tech)) y copia su URL.
3. En el proyecto de Vercel define las variables:
   - `DATABASE_URL` = la URL de Postgres
   - `NEXT_PUBLIC_SITE_URL` = la URL final del sitio
4. Cambia `provider` a `"postgresql"` en `prisma/schema.prisma`, haz commit, y
   Vercel desplegará automáticamente.

> El `build` ya corre `prisma generate`. Para la primera carga de datos puedes
> correr `npm run db:seed` apuntando `DATABASE_URL` a tu Postgres.

## Pasar a producción (Postgres)

1. En `prisma/schema.prisma` cambia `provider = "sqlite"` por `"postgresql"`.
2. Apunta `DATABASE_URL` a tu instancia (Neon, Supabase, etc.).
3. `npx prisma migrate dev --name init`.

## Próximos pasos sugeridos

- **Autenticación** para que cada dueño edite solo su banca (hoy cualquiera con
  acceso puede editar).
- **Subida de fotos** (Supabase Storage / S3) en vez de pegar URL.
- **Búsqueda** global por placa y banca.
- Árbol de linaje de varias generaciones e impresión/exportación del registro.
