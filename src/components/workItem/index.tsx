"use client";
import Image from "next/image";
import { ButtonBase } from "../common/button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import gsap from "gsap";

interface WorkCardProps {
  children?: React.ReactNode;
  imgSrc: string;
  imgAlt: string;

  onClick: () => void;
}

function mapNumberRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const WorkCard = ({ imgSrc, imgAlt, onClick, children }: WorkCardProps) => {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);

  /**
   * CARD_FLIP_LOGIC
   */
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [degree, setDegree] = useState(0);
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    if (cardRef.current) {
      const el = cardRef.current;

      el.addEventListener("mousemove", (e) => {
        // 카드 내부에서의 마우스 좌표 (0,0은 카드의 좌측 상단)
        const pointerX = e.clientX;
        const pointerY = e.clientY;

        const cardRect = el.getBoundingClientRect();

        // 카드의 반지름
        const halfWidth = cardRect.width / 2;
        const halfHeight = cardRect.height / 2;

        const cardCenterX = cardRect.left + halfWidth;
        const cardCenterY = cardRect.top + halfHeight;

        // 카드 중심에서 어느정도 떨어져 있는가
        const deltaX = pointerX - cardCenterX;
        const deltaY = pointerY - cardCenterY;

        // 마우스와 카드 중심 간의 거리 계산 (피타고라스 정리 사용)
        const distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const maxDistance = Math.max(halfWidth, halfHeight);

        // 중앙에서 얼마나 먼지.
        const degree = mapNumberRange(distanceToCenter, 0, maxDistance, 0, 10);

        const rx = mapNumberRange(deltaY, 0, halfWidth, 0, 1);
        const ry = mapNumberRange(deltaX, 0, halfHeight, 0, 1);

        setRotateX(rx);
        setRotateY(ry);
        setDegree(degree);
        setOpacity(mapNumberRange(distanceToCenter, 0, maxDistance, 0, 0.6));
      });

      el.addEventListener("mouseleave", () => {
        // 마우스가 떠나면 원래 위치로 복귀
        setRotateY(0);
        setRotateX(0);
        setDegree(0);
        setOpacity(0);
      });
    }
  }, [cardRef]);

  /**
   * HOVER_ITEM_LOGIC
   */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoverItemRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (containerRef.current && hoverItemRef.current) {
      const containerEl = containerRef.current;
      const hoverEl = hoverItemRef.current;

      containerEl.addEventListener("mousemove", (e) => {
        const containerRect = containerEl.getBoundingClientRect();
        const hoverRect = hoverEl.getBoundingClientRect();
        const x = e.clientX - containerRect.left - hoverRect.width / 2;
        const y = e.pageY - (containerRect.top + window.scrollY);
        setCoordX(x);
        setCoordY(y);
      });
    }
  }, []);

  const hoverItemClass = cn(
    "flex absolute z-50 h-40 w-40 bg-red-500 pointer-events-none justify-center items-center",
    opacity ? "opacity-100" : "opacity-0",
  );

  useEffect(() => {
    if (hoverItemRef.current && containerRef.current) {
      const hoverEl = hoverItemRef.current;
      containerRef.current.addEventListener("mouseenter", () => {
        gsap
          .fromTo(
            hoverEl,
            {
              width: 0,
              color: "transparent",
              ease: "power2.out",
            },
            {
              width: 200,
              color: "black",
              duration: 0.5,
              ease: "power2.out",
            },
          )
          .restart();
      });

      containerRef.current.addEventListener("mouseleave", () => {
        gsap.fromTo(
          hoverEl,
          {
            width: 200,
            ease: "power2.out",
          },
          {
            width: 0,
            duration: 0.5,
            ease: "power2.out",
          },
        );
      });
    }
  }, [hoverItemRef, containerRef]);

  return (
    <div
      className="relative grid w-full flex-1 grid-cols-8 gap-[1.5vw] py-40"
      ref={containerRef}
    >
      <div
        className={hoverItemClass}
        style={{ translate: `${coordX}px ${coordY}px` }}
        ref={hoverItemRef}
      >
        A Test Text...
      </div>

      <ButtonBase
        ref={cardRef}
        onClick={onClick}
        className="relative col-start-2 col-end-8 cursor-none"
      >
        <div
          style={{
            transform: `perspective(1500px) rotate3d(${-rotateX}, ${rotateY}, 0, ${degree}deg)`,
          }}
          className="card-tilt relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-emerald-300"
        >
          {/* GLOSS */}
          <div
            className="absolute z-10 h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0)_100%)] opacity-0"
            style={{
              transform: `translate(${-rotateY * 100}%, ${-rotateX * 100}%) scale(2.4)`,
              opacity,
            }}
          />
          <Image src={"/next.svg"} fill alt={imgAlt} />
        </div>
        {children}
      </ButtonBase>
    </div>
  );
};

export default WorkCard;
