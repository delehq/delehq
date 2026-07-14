import type { ReactNode } from "react";
import { requireAdminSession } from "@/lib/auth/dal";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminSession();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f5f5f4] text-black tablet:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-5 tablet:p-8">{children}</main>
    </div>
  );
}
