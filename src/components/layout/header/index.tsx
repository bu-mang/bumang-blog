import HeaderInner, { HeaderFallback } from "./headerInner";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "@suspensive/react";

const Header = () => {
  /**
   * @헤더컴포넌트의_서버레이어
   */
  // const accessToken = getCookie({ name: "accessToken" });

  return (
    <ErrorBoundary fallback={<HeaderFallback isLoading={false} />}>
      <Suspense clientOnly fallback={<HeaderFallback isLoading />}>
        <HeaderInner />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Header;
