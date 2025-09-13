import { RefObject, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CustomCursorProps {
  targetRef: RefObject<HTMLElement | null>;
  cursorSpec?: {
    width: number;
    height: number;
    delay: number;
    imageUrl?: string;
  };
  followerSpec?: {
    width: number;
    height: number;
    delay: number;
    imageUrl?: string;
  };
  isFollowerExist?: boolean;
  isWiggling?: boolean;
  mousePosition?: { x: number; y: number; leftClicked: boolean };
}

export default function CustomCursor({
  targetRef,
  cursorSpec = { width: 20, height: 20, delay: 0.1 },
  followerSpec = { width: 40, height: 40, delay: 0.3 },
  isFollowerExist = true,
  isWiggling = false,
  mousePosition,
}: CustomCursorProps) {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  // 초기 설정, 이벤트등록
  // 비싼 연산이니 1회만 하도록
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const targetElement = targetRef.current;

    if (!cursor || (isFollowerExist && !follower) || !targetElement) return;

    // 지글거리는 애니메이션 (한 번만 설정)
    let wiggleAnimation: GSAPAnimation;
    if (isWiggling) {
      wiggleAnimation = gsap.to(cursor, {
        duration: 0.5,
        rotation: 360,
        repeat: -1,
        ease: "none",
      });
    }

    // 마우스 이벤트 (한 번만 등록)
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        duration: cursorSpec.delay,
        x: e.clientX - cursorSpec.width / 2,
        y: e.clientY - cursorSpec.height / 2,
      });

      if (isFollowerExist) {
        gsap.to(follower, {
          duration: followerSpec.delay,
          x: e.clientX - followerSpec.width / 2,
          y: e.clientY - followerSpec.height / 2,
        });
      }
    };

    targetElement.addEventListener("mousemove", onMouseMove);

    return () => {
      if (wiggleAnimation) wiggleAnimation.kill();
      targetElement.removeEventListener("mousemove", onMouseMove);
    };
    // eslint-disable-next-line
  }, []);

  // 타겟 뿐만 아니라 그 하위 계층에서도 커서 노출 안 되게 만들기
  useEffect(() => {
    const targetElement = targetRef.current;
    if (!targetElement || !cursorSpec.imageUrl) return;

    // 강제로 커서 숨기기
    targetElement.style.cursor = "none";

    // 모든 자식 요소도 커서 숨기기
    const allChildren = targetElement.querySelectorAll("*");
    allChildren.forEach((child: Element) => {
      (child as HTMLElement).style.cursor = "none";
    });

    return () => {
      // 클린업 시 원복 (선택사항)
      targetElement.style.cursor = "";
      allChildren.forEach((child: Element) => {
        (child as HTMLElement).style.cursor = "";
      });
    };
  }, [targetRef, cursorSpec.imageUrl]);

  // 2. 클릭 상태 처리
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 마우스 숨기기 애니메이션
    if (mousePosition?.leftClicked) {
      gsap.to(cursor, {
        duration: 0.3,
        opacity: 0,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(cursor, {
        duration: 0.3,
        opacity: 1,
        ease: "power2.inOut",
      });
    }
    // eslint-disable-next-line
  }, [mousePosition?.leftClicked]); // 클릭 상태만 추적

  // 3. 마우스 위치 처리 (별도 useEffect)
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !mousePosition) return;

    gsap.to(cursor, {
      duration: cursorSpec.delay,
      x: mousePosition.x - cursorSpec.width / 2,
      y: mousePosition.y - cursorSpec.height / 2,
    });

    if (isFollowerExist && follower) {
      gsap.to(follower, {
        duration: followerSpec.delay,
        x: mousePosition.x - followerSpec.width / 2,
        y: mousePosition.y - followerSpec.height / 2,
      });
    }
    // eslint-disable-next-line
  }, [mousePosition?.x, mousePosition?.y]); // 위치만 추적

  return (
    <div className="cursor-none">
      {/* 메인 커서 */}
      <div
        ref={cursorRef}
        style={{
          width: cursorSpec.width,
          height: cursorSpec.height,
          backgroundImage: cursorSpec.imageUrl
            ? `url(${cursorSpec.imageUrl})`
            : undefined,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        className={`pointer-events-none fixed z-50 rounded-full ${
          cursorSpec.imageUrl ? "" : "bg-blue-500"
        }`}
      />

      {/* 팔로워 */}
      {isFollowerExist && (
        <div
          ref={followerRef}
          style={{
            width: followerSpec.width,
            height: followerSpec.height,
            backgroundImage: followerSpec.imageUrl
              ? `url(${followerSpec.imageUrl})`
              : undefined,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            cursor: followerSpec.imageUrl ? "none" : "auto",
          }}
          className={`pointer-events-none fixed z-40 rounded-full opacity-50 ${
            followerSpec.imageUrl ? "" : "border-2 border-blue-300"
          }`}
        />
      )}
    </div>
  );
}
