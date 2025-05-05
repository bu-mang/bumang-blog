"use client";

import { FillButton as Button, Divider } from "@/components/common";
import { LoginInfoAccordion } from "@/components/pages/login/loginInfoAccordion";
import { Input } from "@/components/ui/input";
import {
  LAYOUT_PADDING_ALONGSIDE,
  LAYOUT_PADDING_TOP,
} from "@/constants/layout";
import { cn } from "@/utils/cn";

export default function Main() {
  const mainPageClass = cn(
    "flex flex-1 gap-[1.5vw] justify-center w-full",
    LAYOUT_PADDING_TOP,
    LAYOUT_PADDING_ALONGSIDE,
  );

  return <main className={mainPageClass}>MAIN</main>;
}
