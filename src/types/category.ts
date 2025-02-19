import type { UserRole } from "@/types/user";

export interface IndicatorValues {
  value: string;
  label: string;
}

export interface CategoryNode extends IndicatorValues {
  parent: string | null;
  isVisible: boolean;
  permissions: UserRole[];
}
