export interface ImageItemType {
  width: number;
  height: number;
  imgUrl: string;
  title?: string;
}

export interface PlayItemType {
  id: number;
  title: string;
  content: string;
  thumnail: ImageItemType;
  items: ImageItemType[];
  imageOnly?: boolean;
  isVisible?: boolean;
  createdAt: string;
}

export type PlayItemListType = (PlayItemType | null)[];
