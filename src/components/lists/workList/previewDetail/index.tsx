import { StackTree } from "@/types/item";
import ClickToDetail from "../clockToDetail";

interface Props {
  id: string;
  title: string; // 제목
  desc?: string;
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
  desc,
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
    <div
      className="flex h-full w-full flex-col p-8 text-white"
      style={{ backgroundColor: bgColor }}
    >
      <div className="mb-4 w-full animate-slide-up border-b pb-4 text-32 font-semibold">
        {title}
      </div>
      <div className="animate-slide-up delay-100">
        {/* TODO: DateFNS */}
        <div>{desc}</div>
        <div>
          {platform.map((pl) => (
            <span key={pl}>{pl}</span>
          ))}
        </div>
        <div>
          {participants} | {roleMain}
        </div>
        <div className="flex">
          <div>{date.startDate.toDateString()}</div>
          <div>-</div>
          <div>{date.endDate?.toDateString()}</div>
        </div>
      </div>
      <ClickToDetail />
    </div>
  );
};

export default PreviewDetail;
