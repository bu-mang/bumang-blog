import Providers from "@/components/tanstackQueryProvider";
import { Footer, Header, Grid } from "@/components/layout";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import InteractiveBackground from "@/components/layout/interactiveBackground";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import OpenedModals from "@/components/modal/openedModals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Bumang Route53",
    default: "Bumang Route53",
  },
  description: "Bumang's Portfolio & Blog",
  metadataBase: new URL("https://www.bumang.xyz"),

  // Open Graph
  openGraph: {
    title: "Bumang Route53",
    description: "Bumang's Portfolio & Blog",
    url: "https://www.bumang.xyz",
    siteName: "Bumang Route53",
    images: [
      {
        url: "/works/bumangRoute53.png",
        width: 1200,
        height: 630,
        alt: "Thumbnail Image",
      },
    ],
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Bumang Route53",
    description: "Bumang's Portfolio & Blog",
    creator: "@bumang",
    images: ["/works/bumangRoute53.png"],
  },

  // 파비콘
  icons: {
    icon: "/favicon.ico",
  },

  // 기타
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const isGridOn = false;

  console.log = process.env.NODE_ENV === "production" ? () => {} : console.log;

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <Providers>
      <NextIntlClientProvider>
        <html suppressHydrationWarning lang={locale}>
          <head>
            <link
              rel="preconnect"
              href="https://cdn.jsdelivr.net"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              as="style"
              crossOrigin="anonymous"
              href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
            />
          </head>
          <body className="flex-1">
            {isGridOn && <Grid />}
            <Header />
            <div className="w-screen">{children}</div>
            <InteractiveBackground />
            <Footer />
            <OpenedModals />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
            />
          </body>
        </html>
      </NextIntlClientProvider>
    </Providers>
  );
}
