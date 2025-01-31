import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

interface TagProps {
  title: string;
  url?: string;
  onClick?: () => void;
  type?: "link" | "button";
  className?: string;
  layout?: "default" | "label";
}

const Tag = ({
  title,
  url,
  onClick,
  type = "link",
  className,
  layout = "default",
}: TagProps) => {
  const [isActivated, setIsActivated] = useState(false);

  const handleClick = () => {
    setIsActivated((prev) => !prev);
    if (onClick) onClick();
  };

  const tagClass = clsx(
    "h-fit rounded-8 bg-gray-1 px-2 py-1 text-sm text-gray-200 transition-all",
    {
      ["bg-gray-700 text-white hover:bg-gray-500"]:
        isActivated && layout !== "label",
      ["text-gray-900"]: isActivated && layout === "label",
      ["bg-transparent"]: layout === "label",
      ["hover:bg-gray-5"]: layout !== "label",
    },
    className,
  );

  if (type === "link") {
    return (
      <Link href={url ?? ""} className={tagClass}>
        {title}
      </Link>
    );
  }

  if (type === "button") {
    return (
      <button onClick={handleClick} className={tagClass}>
        {title}
      </button>
    );
  }
};

export default Tag;
