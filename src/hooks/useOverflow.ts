"use client";
import { useEffect, useState } from "react";

const useOverflow = (ref: React.RefObject<HTMLElement>) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        setIsOverflow(ref.current.scrollWidth > ref.current.clientWidth);
      }
    };

    // 초기 체크
    checkOverflow();

    // Resize 감지
    const observer = new ResizeObserver(checkOverflow);
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return isOverflow;
};

export default useOverflow;
