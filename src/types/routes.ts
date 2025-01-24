export interface MenuType {
  title: string;
  url: string;
  sub?: MenuType[];
  parents?: string[];
  group?: string;
}
