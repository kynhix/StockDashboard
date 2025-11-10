"use client"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useState } from "react";

const items = [
  {
    title: "AAPL",
    url: "#",
  },
  {
    title: "TSLA",
    url: "#",
  },
  {
    title: "NVDA",
    url: "#",
  },
  {
    title: "AMD",
    url: "#",
  },
  {
    title: "MSFT",
    url: "#",
  },
]

export function AppSidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Sidebar>
      <SidebarHeader>Stock Dashboard</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Stocks</SidebarGroupLabel>
          <SidebarInput
            type="search"
            placeholder="Search for stock..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SidebarMenu>
            {items
              .filter((item) =>
                searchTerm === '' ||
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
