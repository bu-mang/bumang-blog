import Providers from "@/components/pages/tanstakQueryProvider";
import { getAccessTokenFromCookies } from "@/utils/cookies/getAccessTokenFromCookies";
import { Footer, Header, Grid } from "@/components/layout";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isGridOn = false;

  // 쿠키에서 토큰을 추출해오기
  const token = getAccessTokenFromCookies("tokenOnly");

  return (
    <Providers isAuthenticated={!!token}>
      <html suppressHydrationWarning lang="ko">
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
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
