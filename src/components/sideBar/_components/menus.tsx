import { ButtonBase } from "@/components/common/button";
import { HTMLAttributes } from "react";

interface LabelProps {
  title: string;
  amount: number;
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  value: string | number;
}

const Badge = ({ value }: BadgeProps) => {
  return (
    <span className="rounded-md bg-gray-1 px-1.5 text-xs font-semibold text-gray-100">
      {value}
    </span>
  );
};

const Label = ({ title }: LabelProps) => {
  return (
    <ButtonBase className="flex items-center gap-0.5 rounded-lg px-2 py-1 text-xs text-gray-200">
      <span className="truncate transition-all duration-200 hover:underline">
        {title}
      </span>
      <Badge value={5} />
    </ButtonBase>
  );
};

const Category = ({ title, amount }: LabelProps) => {
  return (
    <ButtonBase className="group flex items-center justify-between rounded-lg px-2 py-0.5 font-medium text-gray-600 transition-all hover:bg-gray-1">
      <span className="truncate text-sm transition-all duration-200 group-hover:underline">
        {title}
      </span>
    </ButtonBase>
  );
};

const Menus = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col">
          {/* LABEL */}
          <Label title={"Life"} amount={5} />
          {/* CATEGORIES */}
          <Category title={"Diary"} amount={15} />
          <Category title={"Art"} amount={25} />
          <Category title={"Memo"} amount={55} />
        </div>
        <div className="flex flex-col">
          {/* LABEL */}
          <Label title={"Projects"} amount={56} />
          {/* CATEGORIES */}
          <Category title={"Link Snap"} amount={3} />
          <Category title={"Yin Tarot"} amount={25} />
          <Category title={"Bumang Web"} amount={5} />
          <Category title={"Yanolja Bootcamp's"} amount={4} />
          <Category title={"project etc"} amount={5} />
        </div>
        <div className="flex flex-col">
          {/* LABEL */}
          <Label title={"Frontend"} amount={5} />
          {/* CATEGORIES */}
          <Category title={"HTML&CSS"} amount={5} />
          <Category title={"Javascript"} amount={5} />
          <Category title={"TypeScript"} amount={5} />
          <Category title={"React"} amount={5} />
          <Category title={"Next.js"} amount={5} />
          <Category title={"React Native"} amount={5} />
          <Category title={"Browser Optimization"} amount={5} />
          <Category title={"Frontend etc"} amount={5} />
          <Category title={"Error Handling"} amount={5} />
        </div>
        <div className="flex flex-col">
          {/* LABEL */}
          <Label title={"Backend"} amount={5} />
          {/* CATEGORIES */}
          <Category title={"Node.js"} amount={5} />
          <Category title={"Nest.js"} amount={5} />
          <Category title={"DB"} amount={5} />
        </div>
        <div className="flex flex-col">
          {/* LABEL */}
          <Label title={"Computer Science"} amount={5} />
          {/* CATEGORIES */}
          <Category title={"Network"} amount={5} />
          <Category title={"Design Pattern"} amount={5} />
          <Category title={"Operating System"} amount={5} />
        </div>
        <div className="flex flex-col">
          {/* LABEL */}
          <Label title={"Algorithm"} amount={5} />
          {/* CATEGORIES */}
          <Category title={"Coding Test"} amount={5} />
          <Category title={"Data Structure"} amount={5} />
        </div>
        <div className="flex flex-col">
          {/* LABEL */}
          <Label title={"Interactives"} amount={5} />
          {/* CATEGORIES */}
          <Category title={"CSS・Canvas ・ p5.js ・ Pixi.js"} amount={5} />
          <Category title={"Three.js ・ Unity ・ Game"} amount={5} />
        </div>
        <div className="flex flex-col">
          {/* LABEL */}
          <Label title={"Notes"} amount={5} />
          {/* CATEGORIES */}
          <Category title={"Git ・ Github"} amount={5} />
          <Category title={"Math"} amount={5} />
          <Category title={"Etc"} amount={5} />
        </div>
      </div>
    </>
  );
};

export default Menus;
