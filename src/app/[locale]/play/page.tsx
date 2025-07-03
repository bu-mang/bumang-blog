import { PlayItem } from "@/components/pages";

export default function Play() {
  return (
    <main className="mx-[10vw] grid grid-cols-1 gap-x-[1.5vw] gap-y-[3vw] sm:grid-cols-2 lg:grid-cols-4">
      {[1, null, 2, 3, null, 4, 5, 6, 7, null, 8].map((item) => {
        if (!item) return <div key={item} />;

        return (
          <PlayItem
            key={item}
            // className="bg-blue"
            width={736}
            height={736}
            title={"1skdmqwkdmqwn djkqwndjk qwndjk qwndjkqw"}
            content={item.toString()}
          />
        );
      })}
    </main>
  );
}
