"use client";

import ListItemView from "./itemList/listItemView";
import GridItemView from "./itemList/gridItemView";

import useQueryProps from "@/hooks/useQueryProps";

const ItemListDeck = () => {
  const { list } = useQueryProps();

  console.log(list, "list????");

  return (
    <div className="">
      {(list === "list" || !list) && <ListItemView />}
      {list === "grid" && <GridItemView />}
    </div>
  );
};

export default ItemListDeck;
