import { StickyToolbar } from "@/components";
import { WorkItemListDeck } from "@/components/lists";

const Gallery = () => {
  return (
    <div className="mt-8 h-[1500px] w-full">
      <StickyToolbar />
      <WorkItemListDeck />
    </div>
  );
};

export default Gallery;
