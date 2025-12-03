'use client'

import { Stock } from "@/types/stock"
import StockAttribute from "./StockAttribute"
import { useEffect, useState } from "react"

export default function StockInfo(props: { symbol: string }) {
  const [stock, setStock] = useState<Stock | null>(null)

  useEffect(() => {
    const fetchStock = async () => {
      const resp = await fetch(`http://localhost:8000/stock/${props.symbol}`);
      setStock(await resp.json());
    }
    fetchStock();
  }, [props.symbol])

  return <div className="flex flex-col bg-black/2 max-w-200 min-h-full mx-auto flex-wrap p-4">
    {stock ?
      <>
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
          <StockAttribute name="P/E ratio" attribute={stock.pe.toFixed(2)} />
        </div>
      </> : <div>Loading</div>}
  </div>
}
