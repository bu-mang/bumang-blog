import { StickyToolbar } from "@/components";
import ItemListDeck from "@/components/lists";

const WorkCategory = () => {
  return (
    <div className="mt-8 h-[500px] w-full bg-red">
      <StickyToolbar />
      <ItemListDeck />
    </div>
  );
};

export default WorkCategory;
