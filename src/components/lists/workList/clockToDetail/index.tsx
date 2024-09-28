import { BsArrowRight as ArrowRightIcon } from "react-icons/bs";

const ClickToDetail = () => {
  return (
    <div className="absolute bottom-8 left-[50%] flex translate-x-[-50%] items-center gap-3 text-gray-200 opacity-0 group-hover:opacity-100">
      <span>Click to Detail</span>
      <ArrowRightIcon
        size={12}
        className="animate-arrow infinite translate-y-2"
      />
    </div>
  );
};

export default ClickToDetail;
