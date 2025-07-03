"use client";

import { FillButton } from "@/components/common";
import TooltipModal from "@/components/modal/type/tooltip";
import {
  LAYOUT_PADDING_ALONGSIDE,
  LAYOUT_PADDING_TOP,
} from "@/constants/layouts/layout";
import useModalStore from "@/store/modal";
import { cn } from "@/utils/cn";
import { useEffect } from "react";

export default function Main() {
  const mainPageClass = cn(
    "flex flex-1 gap-[1.5vw] justify-center w-full",
    LAYOUT_PADDING_TOP,
    LAYOUT_PADDING_ALONGSIDE,
  );
  const openModal = useModalStore((state) => state.openModal);

  return (
    <main className={mainPageClass}>
      MAIN
      <FillButton
        onClick={() => {
          openModal(TooltipModal, {
            title: "title",
            desc: "desc",
          });
        }}
      >
        open
      </FillButton>
    </main>
  );
}
