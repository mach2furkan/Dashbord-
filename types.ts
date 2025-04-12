export interface MarketItem {
  id: string
  num: string
  rmi: string
  value: number
  change: number
  pctChange: number
  avat: number
  time: string
  ytd: number
  ytdCur: number
  sparkline1?: number[]
  sparkline2?: number[]
  alert?: boolean
  watched?: boolean
}

export interface MarketSection {
  americas: MarketItem[]
  emea: MarketItem[]
  asiaPacific: MarketItem[]
}

export interface NewsItem {
  id: string
  headline: string
  source: string
  time: string
  category: string
  priority: number
  read: boolean
}

export interface PortfolioItem {
  symbol: string
  name: string
  quantity: number
  price: number
  change: number
  pctChange: number
  value: number
  costBasis: number
  pl: number
  plPct: number
}

export interface UserProfile {
  name: string
  title: string
  company: string
  email: string
  lastLogin: string
  alerts: number
  watchlists: string[]
  favorites: string[]
}
