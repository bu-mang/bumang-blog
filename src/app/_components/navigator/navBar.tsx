"use client";

import { useEffect } from "react";

const NavBar = () => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1); // 예제 데이터
  useEffect(() => {}, []);

  const a = 0;

  return (
    <div className="grid h-14 w-full grid-cols-8 gap-[3vw] bg-blue px-[1vw]">
      <div className="bg-red"></div>
      <div className="bg-red"></div>
      <div className="bg-red"></div>
      <div className="bg-red"></div>
      <div className="bg-red"></div>
      <div className="bg-red"></div>
      <div className="bg-red"></div>
      <div className="bg-red"></div>
    </div>
  );
};

export default NavBar;
