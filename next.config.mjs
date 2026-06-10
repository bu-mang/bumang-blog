import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Docker 최적화를 위한 standalone 빌드

  // @blocknote/server-util은 @blocknote/react(createContext)를 끌어와
  // RSC(react-server) 번들에선 "createContext only works in Client Components"로 터진다.
  // 외부화하면 일반 Node 모듈로 로드돼 정상 동작한다(서버 본문 직렬화용).
  experimental: {
    // isomorphic-dompurify/jsdom: webpack 번들 시 jsdom이 자기 asset
    // (browser/default-stylesheet.css)을 못 찾아 ENOENT로 터진다.
    // 외부화하면 일반 Node require로 로드돼 asset 경로가 정상 해석된다.
    serverComponentsExternalPackages: [
      "@blocknote/server-util",
      "isomorphic-dompurify",
      "jsdom",
    ],
  },

  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      process.env.NEXT_PUBLIC_S3_DOMAIN || "bumang-blog-s3-storage.s3.ap-northeast-2.amazonaws.com",
    ].filter(Boolean), // undefined 제거
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withNextIntl(nextConfig);
