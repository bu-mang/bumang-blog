import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // API 경로 제외하고 모든 경로에 적용
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
