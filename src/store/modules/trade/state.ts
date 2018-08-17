export interface HomeState {
  title: string
  content: string
  count: number
}

export const initalState: HomeState = {
  title: 'mytitle',
  content: 'what',
  count: 1
}

export interface CoinListState {
  symbol?: string
  priceChange?: string
  priceChangePercent?: string
  weightedAvgPrice?: string
  prevClosePrice?: string
  lastPrice?: string
  lastQty?: string
  bidPrice?: string
  bidQty?: string
  askPrice?: string
  askQty?: string
  openPrice?: string
  highPrice?: string
  lowPrice?: string
  volume?: string
  quoteVolume?: string
  openTime?: number
  closeTime?: number
  firstId?: number
  lastId?: number
  count?: number
}
export interface CoinChangeState {
  E: number
  c: string
  e: string
  h: string
  l: string
  o: string
  q: string
  s: string
  v: string
}

export const initalCoinListState: CoinListState[] = []
