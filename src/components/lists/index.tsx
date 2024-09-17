"use client";

import { ListType, SortType } from "@/types/item";
import { useState } from "react";

export const ListItemView = () => {
  return <div></div>;
};

export const GridItemView = () => {
  return <div></div>;
};

const ItemListDeck = () => {
  const [view, setView] = useState<ListType>("List");
  const [sort, setSort] = useState<SortType>("Recent");

  const handleView = (to: ListType) => {
    setView(to);
  };

  const handleSort = (to: SortType) => {
    setSort(to);
  };

  return (
    <div className="">
      {view === "List" && <ListItemView />}
      {view === "Grid" && <GridItemView />}
    </div>
  );
};

export default ItemListDeck;
