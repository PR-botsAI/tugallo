# TuGallo

Versión digital del **"Registro de Gallos"** de las bancas y criaderos de
Puerto Rico. Reproduce el libro físico —placa, placa del padre, placa de la
madre, sexo, color, cresta, marcaje y observaciones— y añade el estado de cada
ave (**vivo / difunto**), búsqueda de linaje y descendencia.

> Registro cultural y genealógico de líneas de sangre y aves de cría.
> **No** organiza, puntúa ni promueve peleas de ningún tipo.

## Stack

- **Next.js 15** (App Router) + TypeScript + **Server Actions** (alta/edición/borrado)
- **Tailwind CSS** (tema vibrante)
- **Prisma** ORM sobre **PostgreSQL** (Neon)

---

## 🚀 Desplegar en Vercel + Neon (recomendado)

Esta es la guía completa para poner el sitio en vivo, gratis.

### Paso 1 — Crea la base de datos en Neon

1. Entra a **[neon.tech](https://neon.tech)** e inicia sesión (puedes usar tu
   cuenta de GitHub).
2. **Create project** → nómbralo `tugallo` → región la más cercana (US East).
3. En **Connection string**, **desmarca "Connection pooling"** (queremos la
   conexión **directa**) y **copia** la cadena. Se ve así:
   `postgresql://usuario:clave@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

### Paso 2 — Importa el repo en Vercel

1. Entra a **[vercel.com/new](https://vercel.com/new)** con tu cuenta de GitHub.
2. Elige **Import** en el repositorio **`PR-botsAI/tugallo`**.

### Paso 3 — Variables de entorno (antes de desplegar)

En la pantalla de import de Vercel, abre **Environment Variables** y añade:

| Name                  | Value                                            |
| --------------------- | ------------------------------------------------ |
| `DATABASE_URL`        | la cadena de Neon del Paso 1                      |
| `NEXT_PUBLIC_SITE_URL`| `https://tugallo.vercel.app` (ajusta luego)       |

### Paso 4 — Deploy

Pulsa **Deploy**. El build corre `prisma generate && prisma db push` (crea las
tablas en Neon automáticamente) y luego compila Next.js. En ~2 min tendrás tu
URL en vivo.

### Paso 5 — Crea tu banca

Abre el sitio → **+ Nueva banca** → llena los datos → **+ Agregar ave**. Los
formularios guardan directo en Neon. El sitio arranca vacío (sin datos de
ejemplo) para que registres tus aves reales.

> **Dominio propio:** en Vercel → Settings → Domains puedes conectar
> `tugallo.com` o el que quieras. Recuerda actualizar `NEXT_PUBLIC_SITE_URL`.

---

## Desarrollo local

Ahora la app usa Postgres (igual que en producción), así que necesitas una URL
de Neon también para local (puedes crear un segundo proyecto/branch gratis).

```bash
cp .env.example .env     # pega tu DATABASE_URL de Neon
npm install
npm run db:push          # crea las tablas
npm run db:seed          # (opcional) datos de ejemplo
npm run dev              # http://localhost:3000
```

### Comandos

| Comando             | Qué hace                                          |
| ------------------- | ------------------------------------------------- |
| `npm run db:push`   | Crea/actualiza las tablas según el esquema        |
| `npm run db:seed`   | Carga datos de ejemplo                            |
| `npm run db:studio` | Abre Prisma Studio para ver/editar datos          |
| `npm run build`     | Compila para producción                           |

---

## Cómo funciona

- **Banca** — la banca/criadero: nombre, propietario, ubicación, año.
- **Bird (Ave)** — los campos del libro: `placa`, `placaPadre`, `placaMadre`,
  `sexo` (Gallo/Gallina), `color`, `cresta`, `marcaje`, `observaciones`, más
  `lifeStatus` (Vivo/Difunto) con fecha de fallecimiento opcional y foto.
- **Linaje por placa** — `placaPadre`/`placaMadre` apuntan a la placa de los
  progenitores. Si esa placa existe en la banca, la app la convierte en un
  enlace; si no, la muestra como referencia. La descendencia se calcula
  buscando aves cuyo padre o madre sea esta placa.

### Páginas

- `/` — portada con resumen.
- `/bancas` y `/bancas/nueva` — listado y alta de bancas.
- `/bancas/[slug]` — el registro de la banca, en tabla igual que el libro.
- `/bancas/[slug]/nueva` — alta de ave.
- `/aves/[id]` y `/aves/[id]/editar` — detalle, linaje, descendencia y edición.

## Próximos pasos sugeridos

- **Autenticación** para que cada dueño edite solo su banca (hoy cualquiera con
  acceso puede editar).
- **Subida de fotos** (Vercel Blob / Supabase Storage) en vez de pegar URL.
- **Búsqueda** global por placa y banca.
- Árbol de linaje de varias generaciones e impresión/exportación del registro.
