import { Metadata } from "next";
import AdminGroupsInner from "@/components/pages/admin/groupsInner";

export const metadata: Metadata = {
  title: "User Groups",
};

export default function AdminGroupsPage() {
  return <AdminGroupsInner />;
}
