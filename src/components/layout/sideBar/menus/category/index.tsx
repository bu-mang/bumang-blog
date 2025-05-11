import { ButtonBase } from "@/components/common";

interface CategoryProps {
  title: string;
}

const Category = ({ title }: CategoryProps) => {
  return (
    <ButtonBase className="group flex items-center justify-between rounded-lg px-2 py-0.5 font-normal text-gray-700 transition-all">
      <span className="truncate text-sm transition-all duration-200 group-hover:underline">
        {title}
      </span>
    </ButtonBase>
  );
};

export default Category;
