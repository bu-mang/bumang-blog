import HeaderInner, { HeaderFallback } from "./headerInner";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "@suspensive/react";
import { getLocale } from "next-intl/server";

const Header = async () => {
  /**
   * @헤더컴포넌트의_서버레이어
   */
  // const accessToken = getCookie({ name: "accessToken" });

  const locale = await getLocale();

  return (
    <ErrorBoundary
      fallback={<HeaderFallback locale={locale} isLoading={false} />}
    >
      <Suspense
        clientOnly
        fallback={<HeaderFallback locale={locale} isLoading />}
      >
        <HeaderInner locale={locale} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Header;
