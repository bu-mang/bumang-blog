import { PlayItem } from "@/components/pages";

export default function Play() {
  return (
    <main className="mx-[10vw] grid grid-cols-6 gap-[1.5vw] bg-red">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
        if (
          item === 1 ||
          item === 2 ||
          item === 3 ||
          item === 5 ||
          item === 7
        ) {
          return (
            <PlayItem
              key={item}
              className="bg-blue"
              title={item.toString()}
              content={item.toString()}
            />
          );
        } else {
          return <div key={item} />;
        }
      })}
    </main>
  );
}
