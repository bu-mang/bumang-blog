import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play",
  alternates: {
    languages: {
      "x-default": "https://bumang.xyz/ko/play",
      ko: "https://bumang.xyz/ko/play",
      en: "https://bumang.xyz/en/play",
    },
  },
};

/**
 * Play 페이지 레이아웃
 *
 * 캔버스 패닝을 위해 뷰포트 전체를 차지하는 고정 레이아웃.
 * - fixed + inset-0: 뷰포트 전체 영역 차지
 * - overflow-hidden: 캔버스가 뷰포트 밖으로 나가도 스크롤바 숨김
 */
export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="fixed inset-0 h-screen w-screen overflow-hidden">
      {children}
    </section>
  );
}
