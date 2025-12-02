'use client'

import { Stock } from "@/types/stock"
import StockAttribute from "./StockAttribute"

export default function StockInfo(props: { symbol: string }) {
  // Mock since no backend
  const stock: Stock = {
    symbol: props.symbol,
    price: 50,
    change: 20,
    open: 30,
    high: 50,
    low: 20,
    close: 40,
    volume: 20,
    pb: 25,
    pe: 25,
    peg: 25,
  }
  return <div className="flex flex-col bg-black/2 max-w-200 min-h-full mx-auto flex-wrap p-4">
    <div className="w-full flex gap-2">
      <span className="text-xl">{stock.symbol} -</span>
      <span className="text-xl font-mono">${stock.price.toFixed(2)}</span>
    </div>
    <div className="flex gap-x-5 flex-wrap pt-5">
      <StockAttribute name="Change" attribute={stock.change} />
      <StockAttribute name="Open" attribute={'$' + stock.open.toFixed(2)} />
      <StockAttribute name="High" attribute={'$' + stock.high.toFixed(2)} />
      <StockAttribute name="Low" attribute={'$' + stock.low.toFixed(2)} />
      <StockAttribute name="Close" attribute={'$' + stock.close.toFixed(2)} />
      <StockAttribute name="Volume" attribute={stock.volume.toFixed(2)} />
      <StockAttribute name="P/E ratio" attribute={'$' + stock.pe.toFixed(2)} />
    </div>
  </div >
}
