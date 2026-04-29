import WorkDetailTemplate from "@/components/pages/work/workDetail/WorkDetailTemplate";
import { BLAI_CONFIG } from "./_script";
import { getWorkMarkdown } from "@/utils/getWorkMarkdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    languages: {
      "x-default": "https://bumang.xyz/ko/work/blai",
      ko: "https://bumang.xyz/ko/work/blai",
      en: "https://bumang.xyz/en/work/blai",
    },
  },
};

export default function Blai({
  params,
}: {
  params: { locale: string };
}) {
  const markdownContent = getWorkMarkdown("blai", params.locale);
  return (
    <WorkDetailTemplate config={BLAI_CONFIG} markdownContent={markdownContent} />
  );
}
