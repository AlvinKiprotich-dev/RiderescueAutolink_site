import type React from "react"
import { Suspense } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import UserProfile from "@/components/user-profile"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Suspense fallback={<div>Loading...</div>}>
          <header className="flex sticky top-0 z-10 h-16 shrink-0 items-center gap-2 bg-background border-b border-border px-6">
            <div className="flex items-center gap-4 flex-1">
              <SidebarTrigger className="-ml-1" />
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 bg-muted/50 border-0 h-10 rounded-lg focus:bg-background focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserProfile />
            </div>
          </header>
        </Suspense>
        <div className="flex-1 bg-gray-100 p-6 dark:bg-gray-900">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
