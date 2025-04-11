import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* The AdminHeader will only be shown on authenticated pages due to the middleware */}
      {children}
    </div>
  )
}
