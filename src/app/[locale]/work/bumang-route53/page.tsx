import WorkDetailTemplate from "@/components/pages/work/workDetail/WorkDetailTemplate";
import { BUMANG_ROUTE53_CONFIG } from "./_script";
import { getWorkMarkdown } from "@/utils/getWorkMarkdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    languages: {
      "x-default": "https://bumang.xyz/ko/work/bumang-route53",
      ko: "https://bumang.xyz/ko/work/bumang-route53",
      en: "https://bumang.xyz/en/work/bumang-route53",
    },
  },
};

export default function BumangRoute53({
  params,
}: {
  params: { locale: string };
}) {
  const markdownContent = getWorkMarkdown("bumang-route53", params.locale);
  return (
    <WorkDetailTemplate
      config={BUMANG_ROUTE53_CONFIG}
      markdownContent={markdownContent}
    />
  );
}
