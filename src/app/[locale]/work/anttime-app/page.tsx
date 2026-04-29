import WorkDetailTemplate from "@/components/pages/work/workDetail/WorkDetailTemplate";
import { ANTTIME_APP_CONFIG } from "./_script";
import { getWorkMarkdown } from "@/utils/getWorkMarkdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    languages: {
      "x-default": "https://bumang.xyz/ko/work/anttime-app",
      ko: "https://bumang.xyz/ko/work/anttime-app",
      en: "https://bumang.xyz/en/work/anttime-app",
    },
  },
};

export default function AnttimeApp({
  params,
}: {
  params: { locale: string };
}) {
  const markdownContent = getWorkMarkdown("anttime-app", params.locale);
  return (
    <WorkDetailTemplate
      config={ANTTIME_APP_CONFIG}
      markdownContent={markdownContent}
    />
  );
}
