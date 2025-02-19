import type { UserRole } from "@/types/user";
import type { DateNode } from "@/types/date";

/**
 * @USED_WITH_TAG_AND_CATEGORY
 */
export interface IndicatorValues {
  value: string;
  label: string;
}

/**
 * @CATEGORY
 */
export interface CategoryNode extends IndicatorValues {
  id: string;
  parent: string | null;
  isVisible: boolean;
  permissions: UserRole[];
}
export interface CategoryWithDate extends CategoryNode, DateNode {}

/**
 * @TAG
 */
export interface TagNode extends IndicatorValues {
  id: string;
}
export interface TagWithDate extends TagNode, DateNode {}
