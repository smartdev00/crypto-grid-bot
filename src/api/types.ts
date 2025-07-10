export interface TickerData {
  open: string;
  symbol: string;
  high24h: string;
  low24h: string;
  lastPr: string;
  quoteVolume: string;
  baseVolume: string;
  usdtVolume: string;
  ts: string;
  bidPr: string;
  askPr: string;
  bidSz: string;
  askSz: string;
  openUtc: string;
  changeUtc24h: string;
  change24h: string;
}

export interface TickerApiResponse {
  code: string;
  msg: string;
  requestTime: number;
  data: TickerData[];
}

export interface CandleData {
  ts: string;
  open: string;
  high: string;
  low: string;
  close: string;
  vol: string;
  volCcy: string;
  volCcyQuote: string;
  confirm: string;
}

export interface CandleApiResponse {
  code: string;
  msg: string;
  requestTime: number;
  data: CandleData[];
} 