import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // 쿠키 스토어 접근
  const cookieStore = cookies();

  // 쿠키 제거 (여러 쿠키를 제거할 경우 각각 호출)
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return NextResponse.json({ success: true });
}
