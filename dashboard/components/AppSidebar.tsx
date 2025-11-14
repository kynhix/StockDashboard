"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface Stock {
  symbol: string
  current_price: number
  price_change: number
  percent_change: number
}

// sidebar showing 25 trending stocks
export function AppSidebar() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedSymbol = searchParams.get("symbol")

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    try {
      const res = await fetch("/api/stocks")
      const data = await res.json()
      setStocks(data.stocks || [])
    } catch (error) {
      console.error("Failed to fetch stocks", error)
    }
    setLoading(false)
  }

  // filter stocks based on search input
  const filteredStocks = stocks.filter((stock) =>
    searchTerm === "" ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStockClick = (symbol: string) => {
    router.push(`/?symbol=${symbol}`)
  }

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
            {loading ? (
              <div className="p-4 text-sm text-muted-foreground">Loading...</div>
            ) : (
              filteredStocks.map((stock) => {
                const isPositive = stock.price_change >= 0
                const isSelected = stock.symbol === selectedSymbol
                
                return (
                  <SidebarMenuItem key={stock.symbol} className="mb-2">
                    <SidebarMenuButton 
                      onClick={() => handleStockClick(stock.symbol)}
                      isActive={isSelected}
                      className={`h-auto py-3 px-3 rounded-lg border transition-all ${
                        isSelected
                          ? "bg-blue-50 border-blue-400 shadow-md border-l-4 border-l-blue-600"
                          : "border-transparent hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col w-full gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-base">{stock.symbol}</span>
                          <span className="font-bold text-sm">${stock.current_price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between border-t pt-2">
                          <span className="text-xs text-gray-500">Price Change</span>
                          <span className={`text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                            {isPositive ? "+" : ""}{stock.percent_change.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}