"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

// card showing all stock metrics
export function StockDetailCard({ stock }: { stock: StockDetail }) {
  const isPositive = stock.price_change >= 0

  // format large numbers 
  const formatLargeNumber = (num?: number) => {
    if (!num) return "N/A"
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toLocaleString()}`
  }

  const formatNumber = (num?: number, decimals: number = 2) => {
    if (num === null || num === undefined) return "N/A"
    return num.toFixed(decimals)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{stock.symbol}</div>
            <div className="text-sm text-muted-foreground">{stock.name}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${stock.current_price}</div>
            <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{stock.price_change} ({isPositive ? '+' : ''}{stock.percent_change}%)
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="text-lg font-semibold">{formatLargeNumber(stock.market_cap)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">P/E Ratio</div>
            <div className="text-lg font-semibold">{formatNumber(stock.pe_ratio)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">EPS</div>
            <div className="text-lg font-semibold">${formatNumber(stock.eps)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Dividend Yield</div>
            <div className="text-lg font-semibold">{formatNumber(stock.dividend_yield)}%</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Volume</div>
            <div className="text-lg font-semibold">{stock.volume?.toLocaleString() || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Avg Volume</div>
            <div className="text-lg font-semibold">{stock.avg_volume?.toLocaleString() || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">52W High</div>
            <div className="text-lg font-semibold">${formatNumber(stock.high_52w)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">52W Low</div>
            <div className="text-lg font-semibold">${formatNumber(stock.low_52w)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}