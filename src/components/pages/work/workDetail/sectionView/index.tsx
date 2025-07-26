import { cn } from "@/utils/cn";
import { CornerDownRight } from "lucide-react";
import Image from "next/image";

type List = { subtitle: string; desc: string[]; list?: List[] }[];
type ContentType = {
  title: string;
  titleDesc: string;
  image: string;

  list: List;
};
interface SectionViewProps {
  id: string;
  content: ContentType;
  order: number;
  locale: "ko" | "en";
}

export default function SectionView({
  id,
  content,
  order,
  locale,
}: SectionViewProps) {
  return (
    <section
      id={id}
      className="mb-80 grid min-h-40 w-full grid-cols-2 gap-[1.5vw]"
    >
      {/* LEFT (TEXTS) */}
      {order % 2 === 1 ? (
        <>
          <div>
            {/* MAIN-TITLE */}
            <div
              className={cn(
                "mb-5 flex items-baseline gap-2",
                locale === "en" && "flex-col",
              )}
            >
              <h2 className="text-4xl font-semibold">{content.title}</h2>
              <h4 className="flex items-center gap-1 text-sm text-gray-400">
                {content.titleDesc}
              </h4>
            </div>

            <ul className="ml-6 mt-3 flex flex-col gap-5">
              {content.list.map((item) => {
                return (
                  <li key={item.subtitle}>
                    <div className="mb-3 font-semibold">{item.subtitle}</div>

                    <ul className="ml-6 flex flex-col gap-3 text-gray-500">
                      {item.desc.map((desc) => (
                        <li key={desc} className="flex gap-1">
                          <CornerDownRight
                            size={16}
                            className="shrink-0 translate-y-0.5"
                          />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative min-h-96 overflow-hidden rounded-2xl bg-gray-5">
            <Image
              src={content.image}
              fill
              alt={`${content.title}_image`}
              objectFit="cover"
            />
          </div>
        </>
      ) : (
        <>
          <div className="relative min-h-96 overflow-hidden rounded-2xl bg-gray-5">
            <Image
              src={content.image}
              fill
              alt={`${content.title}_image`}
              objectFit="cover"
            />
          </div>

          <div>
            {/* MAIN-TITLE */}
            <div
              className={cn(
                "mb-5 flex items-baseline gap-2",
                locale === "en" && "flex-col",
              )}
            >
              <h2 className="text-4xl font-semibold">{content.title}</h2>
              <h4 className="flex items-center gap-1 text-sm text-gray-400">
                {content.titleDesc}
              </h4>
            </div>

            <ul className="ml-6 mt-3 flex flex-col gap-5">
              {content.list.map((item) => {
                return (
                  <li key={item.subtitle}>
                    <div className="mb-3 font-semibold">{item.subtitle}</div>

                    <ul className="ml-6 flex flex-col gap-3 text-gray-500">
                      {item.desc.map((desc) => (
                        <li key={desc} className="flex gap-1">
                          <CornerDownRight
                            size={16}
                            className="shrink-0 translate-y-0.5"
                          />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
