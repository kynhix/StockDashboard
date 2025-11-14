"use client"

import { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js"
import { Chart } from "react-chartjs-2"
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial"
import "chartjs-adapter-date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  CandlestickController,
  CandlestickElement
)

interface ChartData {
  x: string
  o: number  // open
  h: number  // high
  l: number  // low
  c: number  // close
  v: number  // volume
}

// candlestick chart with time period selector
export function StockChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<ChartData[]>([])
  const [period, setPeriod] = useState("3mo")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [symbol, period])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/chart/${symbol}?period=${period}`)
      const json = await res.json()
      if (json.data) {
        setData(json.data)
      }
    } catch (error) {
      console.error("Failed to fetch chart data", error)
    }
    setLoading(false)
  }

  // format data for chart.js financial
  const chartData = {
    datasets: [
      {
        label: symbol,
        data: data.map((d) => ({
          x: new Date(d.x).getTime(),
          o: d.o,
          h: d.h,
          l: d.l,
          c: d.c,
        })),
        borderColor: "rgba(75, 192, 192, 1)",
        color: {
          up: "rgba(34, 197, 94, 0.8)",    // green for up days
          down: "rgba(239, 68, 68, 0.8)",  // red for down days
          unchanged: "rgba(156, 163, 175, 0.8)",
        },
      },
    ],
  }

  const getTimeUnit = (): "day" | "week" | "month" => {
    if (period === "1mo") return "day"
    if (period === "3mo") return "week"
    return "month"
  }

  const options: any = {  
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: getTimeUnit(),  
        },
      },
      y: {
        position: "right" as const,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          // show ohlc values on hover
          label: function (context: any) {
            const point = context.raw
            return [
              `Open: $${point.o.toFixed(2)}`,
              `High: $${point.h.toFixed(2)}`,
              `Low: $${point.l.toFixed(2)}`,
              `Close: $${point.c.toFixed(2)}`,
            ]
          },
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Price Chart</span>
          {/* time period buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={period === "1mo" ? "default" : "outline"}
              onClick={() => setPeriod("1mo")}
            >
              1M
            </Button>
            <Button
              size="sm"
              variant={period === "3mo" ? "default" : "outline"}
              onClick={() => setPeriod("3mo")}
            >
              3M
            </Button>
            <Button
              size="sm"
              variant={period === "1y" ? "default" : "outline"}
              onClick={() => setPeriod("1y")}
            >
              1Y
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[500px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading chart...</p>
          </div>
        ) : (
          <div className="h-[500px]">
            <Chart type="candlestick" data={chartData} options={options} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}