"use client";

import clsx from "clsx";
import { ButtonBase } from "./common/button";
import { LuMoon, LuSun } from "react-icons/lu";

interface SwitchProps {
  activate: boolean;
  onActivate: () => void;
}

const Switch = ({ activate, onActivate }: SwitchProps) => {
  const buttonClass = clsx(
    "flex h-7 w-7 items-center justify-center rounded-full bg-white transition-all",
    activate ? "translate-x-0" : "translate-x-6",
  );

  return (
    <ButtonBase onClick={onActivate}>
      <div className="flex h-9 w-[60px] items-center rounded-full bg-gray-10 px-1">
        <div className={buttonClass}>{activate ? <LuSun /> : <LuMoon />}</div>
      </div>
    </ButtonBase>
  );
};

export default Switch;
