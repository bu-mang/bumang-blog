"use client";

import { useParams } from "next/navigation";

const GalleryCategory = () => {
  const params = useParams()["category"];

  return <div className="flex-1 bg-red">{params}</div>;
};

export default GalleryCategory;
