import WorkDetailTemplate from "@/components/pages/work/workDetail/WorkDetailTemplate";
import { ANTTIME_SWAP_CONFIG } from "./_script";
import { getWorkMarkdown } from "@/utils/getWorkMarkdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    languages: {
      "x-default": "https://bumang.xyz/ko/work/anttime-swap",
      ko: "https://bumang.xyz/ko/work/anttime-swap",
      en: "https://bumang.xyz/en/work/anttime-swap",
    },
  },
};

export default function AnttimeSwap({
  params,
}: {
  params: { locale: string };
}) {
  const markdownContent = getWorkMarkdown("anttime-swap", params.locale);
  return (
    <WorkDetailTemplate
      config={ANTTIME_SWAP_CONFIG}
      markdownContent={markdownContent}
    />
  );
}
