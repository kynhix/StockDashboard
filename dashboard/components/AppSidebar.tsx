"use client"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ChartLine, ChevronDown, ChevronUp, Frown, Minus } from "lucide-react";
import { useMemo, useState } from "react";

type Item = {
  title: string,
  url: string,
  price: number,
  change: number,
}

const items: Item[] = [
  {
    title: "AAPL",
    url: "#",
    price: 155.09,
    change: 1.1,
  },
  {
    title: "TSLA",
    url: "#",
    price: 155.23,
    change: 5.1,
  },
  {
    title: "NVDA",
    url: "#",
    price: 1238,
    change: -1.1,
  },
  {
    title: "AMD",
    url: "#",
    price: 15,
    change: 0,
  },
  {
    title: "MSFT",
    url: "#",
    price: 128,
    change: -5.1,
  },
]

function getIconAndColor(change: number) {
  if (change > 0) {
    return { icon: ChevronUp, color: '#00a500' };
  } else if (change < 0) {
    return { icon: ChevronDown, color: '#a50000' };
  } else {
    return { icon: Minus, color: '#555' };
  }
}

export function AppSidebar() {
  const [searchTerm, setSearchTerm] = useState('');

  const searchItems = useMemo(() =>
  (items
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).map((item) => ({ ...item, ...getIconAndColor(item.change) })))
    , [searchTerm]);

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-5">
        <div className="flex gap-2">
          <ChartLine />
          <h1>Stock Dashboard</h1>
        </div>
        <SidebarInput
          id="search"
          placeholder="Search for stock..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Stocks</SidebarGroupLabel>
          <SidebarMenu>
            {
              searchItems.length > 0 ? searchItems
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="opacity-80" color={item.color} />
                        <span className="w-11">{item.title}</span>
                        <span className="opacity-50">|</span>
                        <span className="opacity-80 pl-1.5">${item.price.toFixed(2)}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
                : <div className="flex ml-auto mr-auto gap-2 opacity-80">No stocks found <Frown /></div>
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
