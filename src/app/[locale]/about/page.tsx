export const dynamic = "force-dynamic";
export const revalidate = 0;

import AboutInner from "@/components/pages/about/aboutInner";
import { cookies } from "next/headers";

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default async function AboutPage({
  params: { locale },
}: AboutPageProps) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <AboutInner
      isAuthenticated={!!accessToken}
      temp={accessToken?.slice(0, 10)}
      locale={locale}
    />
  );
}
