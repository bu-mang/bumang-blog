import { Metadata } from "next";
import AdminHomeInner from "@/components/pages/admin/adminHomeInner";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminHomePage() {
  return <AdminHomeInner />;
}
