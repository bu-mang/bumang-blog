"use client";

import { FillButton as Button, Divider } from "@/components/common";
import { LoginInfoAccordion } from "@/components/pages/login/loginInfoAccordion";
import { Input } from "@/components/ui/input";
import {
  LAYOUT_PADDING_ALONGSIDE,
  LAYOUT_PADDING_TOP,
} from "@/constants/layout";
import { cn } from "@/utils/cn";

export default function Blog() {
  const loginPageClass = cn(
    "flex flex-1 gap-[1.5vw] justify-center w-full",
    LAYOUT_PADDING_TOP,
    LAYOUT_PADDING_ALONGSIDE,
  );

  return (
    <main className={loginPageClass}>
      <form className="flex w-1/2 flex-col rounded-xl border bg-white px-12 py-8 shadow-md">
        {/* TITLE */}
        <span className="mb-2 text-4xl font-bold">Welcome, Friend!</span>

        {/* DESC */}
        <span className="mb-8 text-gray-300">
          Log in and Access all the contents of BUMANG.
        </span>

        {/* ID */}
        <label htmlFor="username" className="mb-1 text-sm text-gray-300">
          ID
        </label>
        <Input id="username" className="mb-5" />

        {/* PASSWORD */}
        <label htmlFor="password" className="mb-1 text-sm text-gray-300">
          Password
        </label>
        <Input id="password" className="mb-10" />

        <Button className="mb-6 h-12 text-white">Login</Button>

        {/* DIVIDER */}
        <div className="mb-4 h-[1px] w-full bg-gray-50" />

        {/* TOOLTIPS */}
        <LoginInfoAccordion />
      </form>

      {/* RIGHT SECTION */}
      <section className="flex w-1/2 flex-col items-center justify-center rounded-xl bg-gray-1 px-12 py-8 text-gray-50">
        SOME COOL IMAGE AND INTERACTION WILL BE HERE....
      </section>
    </main>
  );
}
