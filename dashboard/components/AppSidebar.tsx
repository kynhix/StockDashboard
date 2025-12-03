"use client"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { StockSidebar } from "@/types/stock";
import { ChartLine, ChevronDown, ChevronUp, Frown, Minus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Spinner } from "./ui/spinner";

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
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Array<StockSidebar>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { slug } = useParams();

  const searchItems = useMemo(() =>
  (items
    .filter((item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map((item) => ({ ...item, ...getIconAndColor(item.change) })))
    , [searchTerm, items]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/stocks');
      setItems(await res.json());
      setLoading(false);
    }
    fetchData();
  }, [])

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
              loading ? <div className="flex flex-1 gap-2 justify-center font-black/50 text-[14px] border-spacing-y-10 p-2 rounded"><Spinner /> Fetching stocks...</div>
                : searchItems.length > 0 ? searchItems
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
