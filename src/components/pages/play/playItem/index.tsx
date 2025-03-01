interface PlayItemProps {
  title: string;
  content: string;
  className: string;
}

const PlayItem = ({ title, content, className }: PlayItemProps) => {
  return (
    <div className={className}>
      <span>{title}</span>
      <span>{content}</span>
    </div>
  );
};

export default PlayItem;
