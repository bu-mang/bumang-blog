import type { RoleType, DateType } from "@/types";
import { IndicatorValues } from "./indicatorValue";

export interface CategoryNode extends IndicatorValues {
  /** 아이디 */
  id: string;

  /** 상위카테고리, (null이면 상위카테고리) */
  parent: string | null;

  /** 유저 권한 별 노출 여부 - "public" | "member" | "admin" | "host" */
  permissions: RoleType[];
}

export type CategoryWithDate = DateType & CategoryNode;

export interface CategoryType {
  id: number;
  label: string;
  order: string;
}

export interface GroupType {
  id: number;
  label: string;
  categories: CategoryType[];

  totalPostsCount: number;
}
