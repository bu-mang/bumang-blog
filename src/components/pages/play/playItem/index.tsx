import { cn } from "@/utils/cn";

interface PlayItemProps {
  title: string;
  content: string;
  height: number;
  className?: string;
}

const PlayItem = ({ title, content, height, className }: PlayItemProps) => {
  const containerStyle = cn(
    "group-hover:-translate-y-2 transition-all",
    className,
  );

  return (
    <div className="group">
      <div className={containerStyle} style={{ height }}>
        <span>{title}</span>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default PlayItem;
