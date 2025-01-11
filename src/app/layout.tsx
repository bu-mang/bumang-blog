import { type Metadata } from "next";
import "./globals.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigator from "./_components/navigator";
import { Provider } from "@/components/ui/provider";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Bumang",
  description: "Bumang Portfolio & Blog",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ko" className={poppins.className}>
      <head>
        {/* <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        /> */}
      </head>
      <body className="flex-1">
        <Provider>
          <Navigator />
          {children}
        </Provider>
      </body>
    </html>
  );
}
