"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Main() {
  const height = 200 * 1.5;
  const width = 700 * 1.5;

  // const proportionClass = clsx(`h-${height}`, `w-${width}`);

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      <DotLottieReact
        src="/bumangtm.lottie"
        autoplay
        speed={1.8}
        style={{ height, width }}
      />
      <div>프레텐다드.</div>
    </main>
  );
}
