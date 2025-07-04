export interface ImageItemType {
  width: number;
  height: number;
  imgUrl: string;
  title?: string;
}

export interface PlayItemType {
  title: string;
  content: string;
  thumnail: ImageItemType;
  items: ImageItemType[];
  isVisible?: boolean;
  createdAt: string;
}

export type PlayItemListType = (PlayItemType | null)[];
