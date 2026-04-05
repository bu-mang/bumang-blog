import PlayCanvas from "@/components/pages/play/playCanvas";
import playItems from "./playItemsData";

export default function Play() {
  return <PlayCanvas items={playItems} />;
}
