import WorkDetailTemplate from "@/components/pages/work/workDetail/WorkDetailTemplate";
import { BLAI_CONFIG } from "./_script";
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

export default function Blai() {
  return <WorkDetailTemplate config={BLAI_CONFIG} />;
}
