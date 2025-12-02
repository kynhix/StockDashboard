export type StockSidebar = {
  symbol: string,
  price: number,
  change: number,
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
  pb: number,
  pe: number,
  peg: number,
}
