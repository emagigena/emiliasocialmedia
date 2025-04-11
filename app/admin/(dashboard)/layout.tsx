import type { ReactNode } from "react"
import AdminHeader from "@/components/admin/admin-header"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      {children}
    </div>
  )
}
