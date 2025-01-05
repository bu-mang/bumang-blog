import { type Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigator from "./_components/navigator";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Bumang",
  description: "Bumang Portfolio & Blog",
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  display: "swap",
});

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={`${nunitoSans.className} font-sans`}>
        <Provider>
          <Navigator />
          {children}
        </Provider>
      </body>
    </html>
  );
}
