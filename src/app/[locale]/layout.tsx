import Providers from "@/components/tanstackQueryProvider";
import { Footer, Header, Grid } from "@/components/layout";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import InteractiveBackground from "@/components/layout/interactiveBackground";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const isGridOn = false;

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
