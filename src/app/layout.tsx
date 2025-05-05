import Providers from "@/components/pages/tanstakQueryProvider";
import { Footer, Header, Grid } from "@/components/layout";
import "./globals.css";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isGridOn = false;

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value || null;

  console.log(token, "token!");

  // 유저 정보를 프리패칭해올까...

  return (
    <Providers token={token}>
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
