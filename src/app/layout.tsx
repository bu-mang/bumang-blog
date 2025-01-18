import "./globals.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Provider } from "@/components/ui/provider";

import HomeBanner from "./_components/navigator/navBanner";
import NavBar from "./_components/navigator/navBar";

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className="flex-1">
        <Provider>
          <HomeBanner />
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
