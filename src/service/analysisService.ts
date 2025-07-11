import { CandleData, CandleField } from '../api/types';
import { GridAnalysisResult } from './types';

/**
 * Analyze historical candle data to determine grid parameters.
 * @param candles - Array of CandleData (historical candles)
 * @param currentPrice - Current price of base currency
 * @param gridCount - Number of grid levels
 * @param gridSpread - Percentage spread for grid
 */
export function analyzeCandlesForGrid(
  candles: CandleData[],
  currentPrice: number,
  gridCount: number,
  gridSpread: number
): GridAnalysisResult {
  const closes = candles.map((c) => parseFloat(c[CandleField.close]));
  const minPrice = Math.min(...closes);
  const maxPrice = Math.max(...closes);
  const avgPrice = closes.reduce((a, b) => a + b, 0) / closes.length;

  // Simple volatility: standard deviation of closes
  const mean = avgPrice;
  const variance =
    closes.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / closes.length;
  const volatility = Math.sqrt(variance);

  // Grid bounds: center around avgPrice, spread by gridSpread
  const gridLower = avgPrice * (1 - gridSpread);
  const gridUpper = avgPrice * (1 + gridSpread);
  const gridStep = (gridUpper - gridLower) / gridCount;

  return {
    minPrice,
    maxPrice,
    avgPrice,
    volatility,
    gridLower,
    gridUpper,
    gridStep,
    currentPrice,
  };
}
