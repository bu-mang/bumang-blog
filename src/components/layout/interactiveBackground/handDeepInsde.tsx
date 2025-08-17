"use client";

import Image from "next/image";
import { Character, Hand, RoarHair, Wrist } from "@/assets/play";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { randomBetween } from "@/utils/createRandomBetween";

// 파티클 설정 타입
interface ParticleConfig {
  count: number;
  size: [number, number]; // [min, max]
  opacity: [number, number]; // [min, max]
  blur: number;
  mouseInfluence: number;
  color: string;
  zIndex: number;
}

// 파티클 객체 타입
interface Particle {
  element: HTMLDivElement;
  baseX: number;
  baseY: number;
  mouseInfluence: number;
}

// 파티클 설정
const PARTICLE_CONFIG: Record<"BACKGROUND" | "FOREGROUND", ParticleConfig> = {
  BACKGROUND: {
    count: 40,
    size: [1, 3],
    opacity: [0.1, 0.25],
    blur: 1.5,
    mouseInfluence: 0.02,
    color: "rgba(214, 225, 64, 1)",
    zIndex: 5,
  },
  FOREGROUND: {
    count: 25,
    size: [3, 6],
    opacity: [0.3, 0.6],
    blur: 0.5,
    mouseInfluence: 0.08,
    color: "rgba(214, 225, 64, 1)",
    zIndex: 10,
  },
};

// 패럴랙스 설정 타입
interface ParallaxConfig {
  mouseInfluence: number;
  smoothness: number; // 애니메이션 부드러움 정도
}

// 레이어별 패럴랙스 설정
const PARALLAX_CONFIG = {
  // 뒤에서 앞으로 갈수록 영향도 증가
  BACKGROUND_PARTICLES: {
    mouseInfluence: 0.015, // 가장 적게 움직임
    smoothness: 2.0,
  },
  HAND_WRIST_CHARACTER: {
    mouseInfluence: 0.035, // 중간 정도 움직임
    smoothness: 1.5,
  },
  FOREGROUND_PARTICLES: {
    mouseInfluence: 0.08, // 가장 많이 움직임
    smoothness: 1.0,
  },
} as const;

export default function HandDeepInside() {
  // DOM ref
  const idleRef = useRef<HTMLDivElement | null>(null);

  // 파티클 정보 ref
  const totalParticlesRef = useRef<HTMLDivElement | null>(null);
  const backgroundParticlesRef = useRef<Particle[]>([]);
  const foregroundParticlesRef = useRef<Particle[]>([]);

  // 기본 IDLE 애니메이션
  useEffect(() => {
    const ctx = gsap.context((self) => {
      gsap.to(".ANIM_ALL", {
        y: -30,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      // 손목 회전 애니메이션 (독립적)
      gsap.to(".ANIM_HAND", {
        rotation: -2,
        transformOrigin: "100% 25%",
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      // 머리카락 애니메이션
      gsap.to(".ANIM_ROAR_HAIR", {
        rotation: -10,
        transformOrigin: "50% 0%",
        delay: 1,
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, idleRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // ------ 파티클 생성 함수 ------

  const createParticles = (
    config: ParticleConfig,
    particlesArray: React.MutableRefObject<Particle[]>,
  ) => {
    const particles: Particle[] = [];

    for (let i = 0; i < config.count; i++) {
      const particle = document.createElement("div");
      particle.className = "DUST-PARTICLE";

      // 랜덤 속성
      const size = randomBetween(config.size[0], config.size[1]);
      const opacity = randomBetween(config.opacity[0], config.opacity[1]);
      const x = randomBetween(0, window.innerWidth);
      const y = randomBetween(0, window.innerHeight);

      // 스타일 적용
      gsap.set(particle, {
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: config.color,
        opacity: opacity,
        filter: `blur(${config.blur}px)`,
        left: x,
        top: y,
        zIndex: config.zIndex,
        pointerEvents: "none",
        willChange: "transform",
      });

      // 기본 플로팅 애니메이션
      gsap.to(particle, {
        x: `+=${randomBetween(-50, 50)}`,
        y: `+=${randomBetween(-30, 30)}`,
        duration: randomBetween(4, 8),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: randomBetween(0, 2),
      });

      totalParticlesRef.current?.appendChild(particle);
      particles.push({
        element: particle,
        baseX: x,
        baseY: y,
        mouseInfluence: config.mouseInfluence,
      });
    }

    particlesArray.current = particles;
  };

  useEffect(() => {
    // 파티클 생성
    createParticles(PARTICLE_CONFIG.BACKGROUND, backgroundParticlesRef);
    createParticles(PARTICLE_CONFIG.FOREGROUND, foregroundParticlesRef);

    // 현재 ref 값들을 지역 변수로 복사 (변수명만 공유)
    const currentBackgroundParticles = backgroundParticlesRef.current;
    const currentForegroundParticles = foregroundParticlesRef.current;

    return () => {
      // 파티클 정리
      // 복사된 지역 변수 사용
      [...currentBackgroundParticles, ...currentForegroundParticles].forEach(
        (particle) => {
          particle.element.remove();
        },
      );
    };
  }, []);

  // --------- 마우스 로직 ---------

  // 마우스 위치 상태
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 마우스 이벤트 핸들러
  useEffect(() => {
    const handleMouseMove: (e: MouseEvent) => void = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // 전역 마우스 이벤트 등록
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 패럴랙스 업데이트 함수
  const updateParallax = (mouseX: number, mouseY: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 마우스 위치를 중심점 기준 상대 좌표로 변환
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    // 1. 손 + 손목 + 캐릭터 패럴랙스
    const handParallaxX =
      deltaX * PARALLAX_CONFIG.HAND_WRIST_CHARACTER.mouseInfluence;
    const handParallaxY =
      deltaY * PARALLAX_CONFIG.HAND_WRIST_CHARACTER.mouseInfluence;

    gsap.to(".ANIM_CONTAINER", {
      x: handParallaxX,
      y: handParallaxY,
      duration: PARALLAX_CONFIG.HAND_WRIST_CHARACTER.smoothness,
      ease: "power2.out",
    });

    // 2. 배경 파티클 패럴랙스
    backgroundParticlesRef.current.forEach((particle) => {
      const particleParallaxX =
        deltaX * PARALLAX_CONFIG.BACKGROUND_PARTICLES.mouseInfluence;
      const particleParallaxY =
        deltaY * PARALLAX_CONFIG.BACKGROUND_PARTICLES.mouseInfluence;

      gsap.to(particle.element, {
        x: particle.baseX + particleParallaxX,
        y: particle.baseY + particleParallaxY,
        duration: PARALLAX_CONFIG.BACKGROUND_PARTICLES.smoothness,
        ease: "power2.out",
      });
    });

    // 3. 전경 파티클 패럴랙스
    foregroundParticlesRef.current.forEach((particle) => {
      const particleParallaxX =
        deltaX * PARALLAX_CONFIG.FOREGROUND_PARTICLES.mouseInfluence;
      const particleParallaxY =
        deltaY * PARALLAX_CONFIG.FOREGROUND_PARTICLES.mouseInfluence;

      gsap.to(particle.element, {
        x: particle.baseX + particleParallaxX,
        y: particle.baseY + particleParallaxY,
        duration: PARALLAX_CONFIG.FOREGROUND_PARTICLES.smoothness,
        ease: "power2.out",
      });
    });
  };

  // 마우스 위치 변경 시 패럴랙스 업데이트
  useEffect(() => {
    updateParallax(mousePosition.x, mousePosition.y);
  }, [mousePosition]);

  return (
    <div className="fixed left-0 top-0 h-screen w-screen bg-gradient-to-tl from-red-700 to-red-900 will-change-transform">
      {/* 파티클 */}
      <div ref={totalParticlesRef} className="fixed z-10 h-screen w-screen" />

      {/* 전체 씬 */}
      <div
        ref={idleRef}
        className="ANIM_CONTAINER absolute left-0 top-0 h-screen w-screen"
      >
        <div className="ANIM_ALL relative -top-32 right-20 scale-125">
          <Image
            src={Wrist}
            alt="Wrist"
            width={716 / 2}
            height={440 / 2}
            className="absolute right-0 top-0"
          />

          {/* 손과 캐릭터 (손목 제외) */}
          <div className="ANIM_HAND absolute right-[300px] top-0 h-[894px] w-[1003px] will-change-transform">
            {/* <div className="absolute left-0 top-0 h-1/4 w-full bg-blue-500" /> */}
            <Image
              src={Hand}
              alt="Hand"
              width={2006 / 2}
              height={1788 / 2}
              className="absolute -top-[2px] right-0"
            />

            {/* 캐릭터만 */}
            <div className="ANIM_CHARACTER absolute -left-[64px] bottom-[144px] h-[312.5px] w-[174.5px] will-change-transform">
              <Image
                src={RoarHair}
                alt="RoarHair"
                width={69 / 2}
                height={67 / 2}
                className="ANIM_ROAR_HAIR absolute left-[24px] top-[48px] will-change-transform"
              />
              <Image
                src={Character}
                alt="Character"
                width={349 / 2}
                height={625 / 2}
                className="absolute left-0 top-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
