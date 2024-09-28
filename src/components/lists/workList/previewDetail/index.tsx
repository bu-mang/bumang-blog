import { StackTree } from "@/types/item";
import ClickToDetail from "../clockToDetail";

interface Props {
  id: string;
  title: string; // 제목
  bgColor: string;
  date: {
    startDate: Date;
    endDate?: Date;
  };
  roleMain: "FullStack" | "Front" | "Back";
  roleDetail: string[];
  stack: StackTree[];
  participants: "Solo" | "Team";
  platform: string[];

  link: {
    github: string;
    deploy: string;
  };

  admin?: {
    id: string;
    password: string;
  };
}

const PreviewDetail = ({
  id,
  title,
  bgColor,
  date,
  roleMain,
  roleDetail,
  stack,
  participants,
  platform,
  link,
  admin,
}: Props) => {
  return (
    <div className="animate-slide-up flex h-full w-full flex-col border p-8 text-white">
      <div className="mb-4 w-full border-b border-white pb-4 text-32 font-semibold">
        {title}
      </div>
      {/* TODO: DateFNS */}
      <div className="flex">
        <div>{date.startDate.toDateString()}</div>
        <div>{date.endDate?.toDateString()}</div>
      </div>
      <ClickToDetail />
    </div>
  );
};

export default PreviewDetail;
