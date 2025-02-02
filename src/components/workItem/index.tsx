"use client";
import Image from "next/image";
import { ButtonBase } from "../common/button";
import { useEffect, useRef, useState } from "react";

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
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [degree, setDegree] = useState(0);
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    if (cardRef.current) {
      const el = cardRef.current;

      // const cardContent =
      // card.querySelector(".card__content");
      // const gloss = card.querySelector(".card__gloss");
      // requestAnimationFrame(() => {
      //   gloss.classList.add("card__gloss--animatable");
      // });

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

  console.log(rotateY, "rotateY");
  console.log(rotateX, "rotateX");

  return (
    <div className="relative grid w-full flex-1 grid-cols-8 gap-[1vw] py-40">
      <ButtonBase
        ref={cardRef}
        onClick={onClick}
        className="col-start-2 col-end-8"
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
      </ButtonBase>
      {children}
    </div>
  );
};

export default WorkCard;
