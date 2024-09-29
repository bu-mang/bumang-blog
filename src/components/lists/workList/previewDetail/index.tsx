import { StackTree } from "@/types/item";
import ClickToDetail from "../clockToDetail";
import { dateFormat } from "@/util/dateFormat";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-2 flex text-14 font-bold">{children}</div>;
};

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-fit rounded-4 border border-white px-2 py-1 text-14">
      {children}
    </div>
  );
};

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
  participants:
    | "Solo Project"
    | "Team Project - Teammate"
    | "Team Project - Leader";
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
      className="flex h-full w-full flex-col px-12 py-4 text-white"
      style={{ backgroundColor: bgColor }}
    >
      <div className="mb-14 flex w-full animate-slide-up items-center justify-between text-48 font-semibold">
        <span>{title}</span>
        <ClickToDetail rest="translate-y-3" />
      </div>

      <div className="animate-slide-up">
        <div className="mb-2 h-[1px] w-full bg-white" />
        <div className="mb-8 text-14">{desc}</div>
        <div className="flex gap-8">
          <div>
            <Title>Platform</Title>
            <div className="flex gap-2">
              {platform.map((pl) => (
                <Tag key={pl}>{pl}</Tag>
              ))}
            </div>
          </div>

          <div>
            <Title>Role & Position</Title>
            <div className="flex gap-2">
              <Tag>{participants}</Tag>
              <Tag>{roleMain}</Tag>
            </div>
          </div>

          <div>
            <Title>Date</Title>
            <div className="flex gap-2">
              <Tag>
                {dateFormat(date.startDate)} - {dateFormat(date?.endDate)}
              </Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewDetail;
