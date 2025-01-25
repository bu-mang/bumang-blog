import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Navigator from "../components/navigator";
import Grid from "../components/grid";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isGridOn = false;

  return (
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
      <body className="h-[1500px] flex-1">
        <Provider>
          {isGridOn && <Grid />}
          <Navigator />
          <div className="mt-[240px] h-full w-screen">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
