import WorkDetailTemplate from "@/components/pages/work/workDetail/WorkDetailTemplate";
import { BLAI_CONFIG } from "./_script";
import { getWorkMarkdown } from "@/utils/getWorkMarkdown";
import { Metadata } from "next";

// 마스킹 토글(env WORK_UNMASK)을 재빌드 없이 런타임에 반영 — SSG로 굳지 않게.
export const dynamic = "force-dynamic";

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
