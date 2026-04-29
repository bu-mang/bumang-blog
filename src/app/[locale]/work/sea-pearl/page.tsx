import WorkDetailTemplate from "@/components/pages/work/workDetail/WorkDetailTemplate";
import { SEA_PEARL_CONFIG } from "./_script";
import { getWorkMarkdown } from "@/utils/getWorkMarkdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    languages: {
      "x-default": "https://bumang.xyz/ko/work/sea-pearl",
      ko: "https://bumang.xyz/ko/work/sea-pearl",
      en: "https://bumang.xyz/en/work/sea-pearl",
    },
  },
};

export default function SeaPearl({
  params,
}: {
  params: { locale: string };
}) {
  const markdownContent = getWorkMarkdown("sea-pearl", params.locale);
  return (
    <WorkDetailTemplate
      config={SEA_PEARL_CONFIG}
      markdownContent={markdownContent}
    />
  );
}
