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
            title={item.title}
            content={item.content}
            width={item.thumnail.width}
            height={item.thumnail.height}
            items={item.items}
          />
        );
      })}
    </main>
  );
}
