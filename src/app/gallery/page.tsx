import { StickyToolbar } from "@/components";
import ItemListDeck from "@/components/lists";

const Gallery = () => {
  return (
    <div className="mt-8 h-[1500px] w-full">
      <StickyToolbar />
      <ItemListDeck />
    </div>
  );
};

export default Gallery;
