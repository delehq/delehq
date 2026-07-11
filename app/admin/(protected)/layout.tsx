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
    <div className="flex min-h-screen bg-[#f5f5f4] text-black">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden p-8">{children}</main>
    </div>
  );
}
