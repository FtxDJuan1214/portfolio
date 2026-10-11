import type { Metadata, Viewport } from "next";
import { Fira_Code } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { PaletteProvider } from "@/components/providers/palette-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.shortName} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Portfolio of Juan Camilo Hernández Ortiz, Senior Full Stack Developer focused on SaaS platforms with React, Next.js, Node.js and AWS.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "AWS",
    "Computer Vision",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.shortName} — ${siteConfig.role}`,
    description:
      "Senior Full Stack Developer. Full stack architecture, SaaS platforms and computer vision.",
    siteName: siteConfig.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} — ${siteConfig.role}`,
    description:
      "Senior Full Stack Developer. Full stack architecture, SaaS platforms and computer vision.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1c1526" },
    { media: "(prefers-color-scheme: light)", color: "#f6fbf6" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaCode.variable} antialiased`}>
        <ThemeProvider>
          <PaletteProvider>
            <LocaleProvider>
              <LenisProvider>
                <a
                  href="#about"
                  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
                >
                  Skip to content
                </a>
                <Header />
                <main>{children}</main>
                <Footer />
              </LenisProvider>
            </LocaleProvider>
          </PaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
