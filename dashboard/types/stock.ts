export type StockSidebar = {
  symbol: string,
  price: number,
  change: number,
  name: string,
}

export type Stock = {
  symbol: string,
  price: number,
  change: number,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
  pe: number,
}

export type StockPrediction = {
  model: string,
  accuracy: number,
  precision: number,
  recall: number,
  prediction: string,
  last_price: number,
  ticker: string
}
