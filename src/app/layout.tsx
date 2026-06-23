import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdSlot from "@/components/AdSlot";
import { jsonLdScriptProps, websiteJsonLd, SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ivoire365 — Calendrier, jours fériés et dates utiles en Côte d'Ivoire",
    template: "%s | Ivoire365",
  },
  description:
    "Calendrier 2026, jours fériés, vacances scolaires, Ramadan, Tabaski et outils de calcul de dates pour la Côte d'Ivoire.",
  openGraph: {
    siteName: "Ivoire365",
    locale: "fr_CI",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased flex min-h-screen flex-col">
        <script {...jsonLdScriptProps(websiteJsonLd())} />
        <SiteHeader />
        <div className="no-print">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4">
            <AdSlot variant="header-banner" />
          </div>
        </div>
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
