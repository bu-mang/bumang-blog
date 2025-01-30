import Image from "next/image";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";

interface BlogItemProps {
  title: string;
  category: string;
  tags: string[];
  date: Date;
  id: number;
  imageUrl: string;
}

const BlogItem = ({
  title,
  category,
  tags,
  date,
  id,
  imageUrl,
}: BlogItemProps) => {
  return (
    <Link href={"/blog/" + id} className="text-sm">
      <div className="relative aspect-square w-full overflow-hidden rounded-8 bg-gray-50">
        <Image src={imageUrl} alt="postImage" fill />
      </div>
      <div className="group">
        <div className="mt-2 flex items-center hover:text-gray-500">
          <div className="flex-1 flex-nowrap truncate text-ellipsis font-medium">
            {title}
          </div>
          <LuMoveRight className="animate-arrow text-gray-200 opacity-0 transition-all duration-500 group-hover:opacity-100" />
        </div>
        <div className="w-full flex-nowrap truncate text-ellipsis py-1 text-gray-300 opacity-0 transition-all duration-500 group-hover:opacity-100">
          타입스크립트를 이용한 타입 체킹은 컴파일 시 실행된다. 그러나
          런타임에서 사용자의 입력에 대한 런타임 타입 체킹을 하고 싶다면
        </div>
        <div className="flex w-full -translate-y-6 items-center justify-between text-xs text-gray-200 transition-all duration-500 group-hover:-translate-y-0">
          <div className="flex gap-1">
            {tags.map((tag) => (
              <span key={tag} className="h-fit rounded-2 bg-gray-1 p-1">
                {tag}
              </span>
            ))}
          </div>
          <div>{date.toLocaleDateString("ko-kr")}</div>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
