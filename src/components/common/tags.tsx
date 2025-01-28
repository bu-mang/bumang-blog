import Link from "next/link";

interface TagProps {
  title: string;
  url?: string;
  onClick?: () => void;
  type?: "link" | "button";
}

const Tags = ({ title, url, onClick, type = "link" }: TagProps) => {
  if (type === "link") {
    return <Link href={url ?? ""}>{title}</Link>;
  }

  if (type === "button") {
    return <button onClick={onClick}>{title}</button>;
  }
};

export default Tags;
