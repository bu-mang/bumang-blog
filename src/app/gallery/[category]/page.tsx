import { StickyToolbar } from "@/components";
import ItemListDeck from "@/components/lists";

const GalleryCategory = () => {
  return (
    <div className="mt-8 h-[1500px] w-full">
      <StickyToolbar />
      <ItemListDeck />
    </div>
  );
};

export default GalleryCategory;
