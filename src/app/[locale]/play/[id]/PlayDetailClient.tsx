"use client";

import { PlayItemType } from "@/types/playItem";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "@/i18n/navigation";
import { TfiClose } from "react-icons/tfi";
import { cn } from "@/utils/cn";

interface Props {
  item: PlayItemType;
}

export default function PlayDetailClient({ item }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, {
        opacity: 0,
        y: -50,
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBack = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => router.push("/play"),
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
    >
      <button
        onClick={handleBack}
        className="absolute right-8 top-8 z-50 rounded-lg p-2 text-gray-200 transition-colors hover:bg-white/10"
      >
        <TfiClose size={28} />
      </button>

      <div
        ref={contentRef}
        className={cn(
          "flex max-h-[90vh] flex-col items-center gap-6 overflow-y-auto px-8 py-12",
          item.isCentered && "justify-center",
        )}
        style={{ maxWidth: item.maxWidth ?? "60%" }}
      >
        {item.items.map((img, index) => (
          <div key={`${item.id}-img-${index}`} className="relative">
            <Image
              src={img.imgUrl}
              alt={img.title ?? item.title ?? "Gallery"}
              width={img.width}
              height={img.height}
              className="rounded-lg"
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
              placeholder={img.placeholder === false ? undefined : "blur"}
            />
          </div>
        ))}

        {!item.imageOnly && (
          <div className="flex flex-col items-center gap-1 pt-4">
            <h1 className="text-xl font-semibold text-white">{item.title}</h1>
            <p className="text-sm text-gray-400">{item.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
