import { StaticImageData } from "next/image";

export interface ImageItemType {
  width: number;
  height: number;
  imgUrl: StaticImageData;
  title?: string;
  placeholder?: false;
}

export interface PlayItemMetaData {
  id: number;
  title?: string;
  content?: string;
  items: ImageItemType[];

  thumnail: ImageItemType;

  createdAt: string;
}

export interface PlayItemStyle {
  isVisible?: boolean;
  isCentered?: boolean;
  imageOnly?: boolean;
  containerClassName?: string;
  fill?: boolean;
  objectFit?: "cover" | "contain";
  maxWidth?: number | string;
}

export interface PlayItemType extends PlayItemMetaData, PlayItemStyle {}

export type PlayItemListType = (PlayItemType | null)[];
