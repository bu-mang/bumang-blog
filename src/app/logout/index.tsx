// app/logout/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  // useEffect(() => {
  //   // 클라이언트에서 로그아웃 API 호출
  //   fetch("/api/logout", { method: "POST" }).then(() => {
  //     window.alert("요청은 하냐");

  //     // 로그아웃 완료 후 홈으로 이동
  //     // router.replace("/");
  //   });
  // }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>로그아웃 중...</div>
    </div>
  );
}
