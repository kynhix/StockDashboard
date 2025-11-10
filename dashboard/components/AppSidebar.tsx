import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader } from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Stock Dashboard</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Stocks</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
