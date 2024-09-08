"use client";

import { PathnameNavType } from "@/types/menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogoProps {
  logoMenu: PathnameNavType;
}

const Logo = ({ logoMenu }: LogoProps) => {
  const LINES = [
    "is Reading 아주 희미한 빛으로도",
    "is Obsessed with Jujutsu Kaisen, now",
    "is Obsessed with 헤어질 결심, now",
    "is Watching ",
    "is Concerning ",
    "is Studying ",
  ];

  const router = useRouter();

  const [status, setStatus] = useState(LINES[0]);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseOver = () => {
    if (!isVisible) {
      setStatus((prev) => {
        const currentIndex = LINES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % LINES.length;
        return LINES[nextIndex];
      });

      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  };

  return (
    <div
      className="font-display mb-2 flex w-fit translate-y-0.5 cursor-pointer items-center gap-2"
      onMouseOver={handleMouseOver}
    >
      <Link
        href="/"
        onClick={() => router.push("/")}
        className="text-24 font-bold"
      >
        Bumang
      </Link>
      {isVisible && <span className="text-12 translate-y-0.5">{status}</span>}
    </div>
  );
};

export default Logo;
