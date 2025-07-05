import { PlayItem } from "@/components/pages";
import playItems from "./playItemsData";

export default function Play() {
  return (
    <main className="mx-[10vw] grid grid-cols-1 gap-x-[1.5vw] gap-y-[3vw] sm:grid-cols-2 lg:grid-cols-4">
      {playItems.map((item) => {
        if (!item) return <div key={item} />;

        return (
          <PlayItem
            key={item.title}
            id={item.id}
            title={item.title}
            content={item.content}
            imageOnly={item.imageOnly}
            width={item.thumnail.width}
            height={item.thumnail.height}
            imgUrl={item.thumnail.imgUrl}
            items={item.items}
          />
        );
      })}
    </main>
  );
}
