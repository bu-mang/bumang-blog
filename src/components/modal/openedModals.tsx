"use client";

import useModalStore from "@/store/modal";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const OpenedModals = () => {
  const pathname = usePathname();
  const openedModals = useModalStore((state) => state.openedModals);
  const clearModal = useModalStore((state) => state.clearModal);

  useEffect(() => {
    clearModal();
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    // controlScrollOverflow(!!openedModals.length);
    // eslint-disable-next-line
  }, [!!openedModals.length]);

  return (
    <>
      {openedModals.map((modal, index) => {
        const { Component, props, onResolve, canNotEscape } = modal;

        return (
          <Component
            key={Component.displayName || index}
            {...props}
            onResolve={onResolve}
            canNotEscape={canNotEscape}
          />
        );
      })}
    </>
  );
};

export default OpenedModals;

// const controlScrollOverflow = (hidden?: boolean) => {
//     if (typeof window !== 'undefined') {
//         const html = document.querySelector('html');
//         if (!!html) {
//             const diffWidth = window.innerWidth - document.body.offsetWidth;
//             html.style.setProperty('overflow', hidden ? 'hidden' : 'hidden overlay', 'important');
//             if (hidden) {
//                 html.style.setProperty('padding-right', `${diffWidth}px`, 'important');
//             } else {
//                 html.style.removeProperty('padding-right');
//             }
//         }
//     }
// };
