import { TickerData, TickerApiResponse, CandleData, CandleApiResponse } from './types';
import { httpGet } from './http';
import { BASE_URL } from '../config/config';

/**
 * Fetches BTCUSDT ticker data from Bitget API.
 * Extend this function or add more for other endpoints as needed.
 */
export async function fetchBtcUsdtTicker(): Promise<TickerApiResponse> {
  const url = `${BASE_URL}/tickers?symbol=BTCUSDT`;
  return httpGet<TickerApiResponse>(url);
}

/**
 * Fetches historical candle data from Bitget API.
 * @param symbol - Trading pair symbol (e.g., 'BTCUSDT')
 * @param granularity - Time interval of charts (1min, 5min, 15min, 30min, 1h, 4h, 6h, 12h, 1day, 3day, 1week, 1M)
 * @param endTime - Time end point of the chart data (default: current Unix millisecond timestamp)
 * @param limit - Number of candles to fetch (max 1000)
 */
export async function fetchCandleData(
  symbol: string = 'BTCUSDT',
  granularity: string = '1h',
  endTime: number = Date.now(),
  limit: number = 100,
): Promise<CandleApiResponse> {
  const url = `${BASE_URL}/candles?symbol=${symbol}&granularity=${granularity}&endTime=${endTime}&limit=${limit}`;
  return httpGet<CandleApiResponse>(url);
}
