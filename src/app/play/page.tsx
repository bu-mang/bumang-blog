import { PlayItem } from "@/components/pages";

export default function Play() {
  return (
    <main className="mx-[10vw] grid grid-cols-6 gap-x-[1.5vw] gap-y-[3vw] bg-red">
      {[1, null, 2, 3, null, 4, 5, 6, 7, null, 8].map((item) => {
        if (!item) return <div key={item} />;

        return (
          <PlayItem
            key={item}
            className="bg-blue"
            height={item * 25}
            title={item.toString()}
            content={item.toString()}
          />
        );
      })}
    </main>
  );
}
