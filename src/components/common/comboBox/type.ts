import { UserRole } from "@/types/user";
import { IndicatorValues } from "../type";

export interface CategoryNode extends IndicatorValues {
  parent: string | null;
  isVisible: boolean;
  permissions: UserRole[];
}
