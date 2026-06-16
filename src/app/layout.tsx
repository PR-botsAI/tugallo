import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tugallo.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TuGallo — Registro de Gallos de Puerto Rico",
    template: "%s · TuGallo",
  },
  description:
    "Registro digital de bancas y criaderos de Puerto Rico: placa, linaje (padre y madre), color, cresta, marcaje y estado (vivo/difunto) de cada ave. Preserva tu herencia.",
  keywords: [
    "registro de gallos",
    "banca",
    "criadero",
    "linaje",
    "pedigrí",
    "Puerto Rico",
    "gallos finos",
  ],
  applicationName: "TuGallo",
  openGraph: {
    type: "website",
    locale: "es_PR",
    siteName: "TuGallo",
    title: "TuGallo — Registro de Gallos de Puerto Rico",
    description:
      "El registro digital de tu banca y su linaje. Placa, padre, madre, color y cresta — buscable y para siempre.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "TuGallo — Registro de Gallos de Puerto Rico",
    description:
      "El registro digital de tu banca y su linaje. Buscable y para siempre.",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Navbar />
        <main className="container-tg py-8">{children}</main>
        <footer className="container-tg border-t border-black/5 py-10 text-sm text-brand-slate">
          <p>
            TuGallo · Registro cultural y genealógico de bancas. Documenta
            linajes y aves de cría; no organiza ni promueve peleas.
          </p>
        </footer>
      </body>
    </html>
  );
}
