import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/Navigation";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const SITE_URL = "https://jasperveldhuizen.nl";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | Jasper Veldhuizen`,
    },
    description: t("description"),
    keywords: [
      "Jasper Veldhuizen",
      "developer",
      "automation engineer",
      "workflow automation",
      "Enfocus Switch",
      "API development",
      "JavaScript",
      "TypeScript",
      "Python",
      "Docker",
      "n8n",
      "freelance developer",
      "Netherlands",
    ],
    authors: [{ name: "Jasper Veldhuizen", url: SITE_URL }],
    creator: "Jasper Veldhuizen",
    alternates: {
      canonical: locale === "en" ? SITE_URL : `${SITE_URL}/nl`,
      languages: {
        en: SITE_URL,
        nl: `${SITE_URL}/nl`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
      url: locale === "en" ? SITE_URL : `${SITE_URL}/nl`,
      title: t("title"),
      description: t("description"),
      siteName: "Jasper Veldhuizen",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jasper Veldhuizen",
  url: SITE_URL,
  jobTitle: "Process Improvement Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Veldhuizen Grafisch Effect BV",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Windesheim University of Applied Sciences",
  },
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Workflow Automation",
    "API Development",
    "Docker",
    "Linux",
    "n8n",
    "Enfocus Switch",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barneveld",
    addressCountry: "NL",
  },
  sameAs: [
    "https://github.com/JappertjeV",
    "https://www.linkedin.com/in/jasper-veldhuizen-bb10a3278/",
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50 min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main>{children}</main>
          <footer className="border-t border-zinc-800 py-8 text-center text-zinc-500 text-sm">
            <p>
              © {new Date().getFullYear()} Jasper Veldhuizen ·{" "}
              {t("text")}
            </p>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
