"use client"

import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { StockSearch } from "@/components/StockSearch"
import { StockDetailCard } from "@/components/StockDetailCard"
import { StockChart } from "@/components/StockChart"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface StockDetail {
  symbol: string
  name: string
  current_price: number
  price_change: number
  percent_change: number
  market_cap?: number
  pe_ratio?: number
  volume?: number
  avg_volume?: number
  high_52w?: number
  low_52w?: number
  dividend_yield?: number
  beta?: number
  eps?: number
}

// main page 
export default function Home() {
  const searchParams = useSearchParams()
  const symbol = searchParams.get("symbol")  // get selected stock from url
  const [stockDetail, setStockDetail] = useState<StockDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // fetch stock details when symbol changes
  useEffect(() => {
    if (symbol) {
      fetchStockDetail(symbol)
    } else {
      setStockDetail(null)
    }
  }, [symbol])

  const fetchStockDetail = async (sym: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/stock/${sym}`)
      if (!res.ok) {
        throw new Error("Stock not found")
      }
      const data = await res.json()
      setStockDetail(data)
    } catch (err) {
      setError("Failed to load stock data")
      setStockDetail(null)
    }
    setLoading(false)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col gap-4 p-4 md:p-6">
          {/* global search bar */}
          <div className="flex items-center justify-center">
            <StockSearch />
          </div>

          {/* loading */}
          {loading && (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading stock data...</p>
            </div>
          )}

          {/* error */}
          {error && (
            <div className="flex items-center justify-center h-64">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* empty */}
          {!loading && !error && !stockDetail && (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">
                Select a stock from the sidebar or search for one above
              </p>
            </div>
          )}

          {/* tock details n chart */}
          {!loading && !error && stockDetail && (
            <div className="flex flex-col gap-4">
              <StockDetailCard stock={stockDetail} />
              <StockChart symbol={stockDetail.symbol} />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}