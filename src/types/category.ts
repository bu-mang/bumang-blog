import type { UserRole, DateType } from "@/types";
import { IndicatorValues } from "./indicatorValue";

export interface CategoryNode extends IndicatorValues {
  /** 아이디 */
  id: string;

  /** 상위카테고리, (null이면 상위카테고리) */
  parent: string | null;

  /** 노출여부 */
  // isVisible: boolean;

  /** 유저 권한 별 노출 여부 - "public" | "member" | "admin" | "host" */
  permissions: UserRole[];
}

export type CategoryWithDate = DateType & CategoryNode;
