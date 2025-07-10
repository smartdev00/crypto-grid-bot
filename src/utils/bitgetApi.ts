import axios from 'axios';
import { TickerData, TickerApiResponse, CandleData, CandleApiResponse } from './types';

const BASE_URL = 'https://api.bitget.com/api/v2/spot/market';

/**
 * Fetches BTCUSDT ticker data from Bitget API.
 * Extend this function or add more for other endpoints as needed.
 */
export async function fetchBtcUsdtTicker(): Promise<TickerApiResponse> {
  const url = `${BASE_URL}/tickers?symbol=BTCUSDT`;
  const response = await axios.get<TickerApiResponse>(url);
  return response.data;
}

/**
 * Fetches historical candle data from Bitget API.
 * @param symbol - Trading pair symbol (e.g., 'BTCUSDT')
 * @param period - Candle period (1m, 5m, 15m, 30m, 1H, 4H, 6H, 12H, 1D, 1W, 1M)
 * @param limit - Number of candles to fetch (max 1000)
 */
export async function fetchCandleData(
  symbol: string = 'BTCUSDT',
  period: string = '1H',
  limit: number = 100
): Promise<CandleApiResponse> {
  const url = `${BASE_URL}/candles?symbol=${symbol}&period=${period}&limit=${limit}`;
  const response = await axios.get<CandleApiResponse>(url);
  return response.data;
}
