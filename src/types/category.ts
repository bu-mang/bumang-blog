import type { UserRole, DateType } from "@/types";
import { IndicatorValues } from "./indicatorValue";

export interface CategoryNode extends IndicatorValues {
  /** 아이디 */
  id: string;

  /** 상위카테고리, (null이면 상위카테고리) */
  parent: string | null;

  /** 노출여부 */
  isVisible: boolean;

  /** 유저 권한 별 노출 여부 - "public" | "member" | "admin" | "host" */
  permissions: UserRole[];
}

/**
 * @CATEGORY_WITH_DATE
 * @value string (실제 비교값)
 * @label string (렌더 시 표시값)
 *
 * @id string (태그아이디)
 * @parent string | null (상위카테고리, null이면 상위카테고리);
 * @isVisible boolean (노출여부)
 * @permmision UserRole[] - ("public" | "member" | "admin" | "host")
 *
 * @createdAt Date (생성일)
 * @updatedAt Date (수정일)
 */
export interface CategoryWithDate extends CategoryNode, DateType {}
