"use client"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { StockSidebar } from "@/types/stock";
import { ChartLine, ChevronDown, ChevronUp, Frown, Minus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const items: StockSidebar[] = [
  {
    symbol: "AAPL",
    price: 155.09,
    change: 1.1,
    name: "Apple",
  },
  {
    symbol: "TSLA",
    price: 155.23,
    change: 5.1,
    name: "Tesla",
  },
  {
    symbol: "NVDA",
    price: 1238,
    change: -1.1,
    name: "NVIDIA",
  },
  {
    symbol: "AMD",
    price: 15,
    change: 0,
    name: "AMD",
  },
  {
    symbol: "MSFT",
    price: 128,
    change: -5.1,
    name: "Microsoft",
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
  const { slug } = useParams();

  const searchItems = useMemo(() =>
  (items
    .filter((item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map((item) => ({ ...item, ...getIconAndColor(item.change) })))
    , [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/stocks');
      console.log(await res.json());
    }
    fetchData();
  })

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-5">
        <Link href="/" className="flex gap-2">
          <ChartLine />
          <h1>Stock Dashboard</h1>
        </Link>
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
                  <SidebarMenuItem key={item.symbol}>
                    <SidebarMenuButton isActive={item.symbol === slug} className="font-mono" asChild>
                      <Link href={`/stock/${item.symbol}`}>
                        <item.icon className="opacity-80" color={item.color} />
                        <span className="w-11">{item.symbol}</span>
                        <span className="opacity-50">-</span>
                        <span className="opacity-80 pl-1.5">${item.price.toFixed(2)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
                : <div className="flex flex-1 gap-2 justify-center font-black/50 text-[14px] bg-black/5 border-spacing-y-10 p-2 rounded">No stocks found <Frown /></div>
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
