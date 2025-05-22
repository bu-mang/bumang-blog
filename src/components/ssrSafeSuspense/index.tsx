import { Suspense } from "react";

const SSRSafeSuspense = (props: React.ComponentProps<typeof Suspense>) => {
  const { fallback } = props;

  return <Suspense {...props} />;
};

export default SSRSafeSuspense;
