export interface MenuType {
  title: string;
  url: string;
  subMenu?: MenuType[];
  as?: string;
}
