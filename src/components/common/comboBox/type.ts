import { UserRole } from "@/types/user";

export interface CategoryNode {
  value: string;
  label: string;
  parent: string | null;
  isVisible: boolean;
  permissions: UserRole[];
}
