import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FlagStripe from "@/components/FlagStripe";
import MobileBottomNav from "@/components/MobileBottomNav";
import AdSlot from "@/components/AdSlot";
import { jsonLdScriptProps, websiteJsonLd, SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ivoire365 · Calendrier, jours fériés et dates utiles en Côte d'Ivoire",
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
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased flex min-h-screen flex-col`}
      >
        <script {...jsonLdScriptProps(websiteJsonLd())} />
        <SiteHeader />
        <FlagStripe />
        <div className="no-print">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4">
            <AdSlot variant="header-banner" />
          </div>
        </div>
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileBottomNav />
      </body>
    </html>
  );
}
