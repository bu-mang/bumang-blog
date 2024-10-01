import { BsArrowRight as ArrowRightIcon } from "react-icons/bs";

interface Props {
  style?: React.CSSProperties;
  rest?: string;
}

const ClickToDetail = ({ style, rest }: Props) => {
  return (
    <div
      className={
        "flex items-center gap-3 text-14 text-gray-200 opacity-0 group-hover:opacity-100 " +
        rest
      }
      style={style}
    >
      <span>Click to Detail</span>
      <ArrowRightIcon
        size={12}
        className="infinite translate-y-2 animate-arrow"
      />
    </div>
  );
};

export default ClickToDetail;
