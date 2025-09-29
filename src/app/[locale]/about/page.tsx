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

  return <AboutInner isAuthenticated={!!accessToken} locale={locale} />;
}
