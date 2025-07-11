import LoginForm from "@/components/pages/login/loginForm";
import { LoginInfoAccordion } from "@/components/pages/login/loginInfoAccordion";
import {
  LAYOUT_PADDING_ALONGSIDE,
  LAYOUT_PADDING_TOP,
} from "@/constants/layouts/layout";
import { cn } from "@/utils/cn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login", // 최종 결과: "회사소개 | 사이트명"
};

export default function Blog() {
  const loginPageClass = cn(
    "flex flex-1 gap-[1.5vw] justify-center w-full",
    LAYOUT_PADDING_TOP,
    LAYOUT_PADDING_ALONGSIDE,
  );

  return (
    <main className={loginPageClass}>
      <div className="flex w-1/2 flex-col rounded-xl border bg-white px-12 py-8 shadow-md">
        {/* TITLE & DESC */}
        <span className="mb-2 text-4xl font-bold">Welcome, Friend!</span>
        <span className="mb-8 text-gray-300">
          Log in and Access all the contents of BUMANG.
        </span>

        {/* FORM */}
        <LoginForm />

        {/* DIVIDER */}
        <div className="mb-4 h-[1px] w-full bg-gray-50" />

        {/* TOOLTIPS */}
        <LoginInfoAccordion />
      </div>

      {/* RIGHT SECTION */}
      <section className="flex w-1/2 flex-col items-center justify-center rounded-xl bg-gray-1 px-12 py-8 text-gray-50">
        SOME COOL IMAGE AND INTERACTION WILL BE HERE....
      </section>
    </main>
  );
}
