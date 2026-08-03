import { Metadata } from "next";
import AdminAuditLogsInner from "@/components/pages/admin/auditLogsInner";

export const metadata: Metadata = {
  title: "감사 로그",
};

export default function AdminAuditLogsPage() {
  return <AdminAuditLogsInner />;
}
