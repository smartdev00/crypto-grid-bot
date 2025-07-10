import { CandleData } from '../api/types';

export interface GridAnalysisResult {
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  volatility: number;
  gridLower: number;
  gridUpper: number;
  gridStep: number;
}

/**
 * Analyze historical candle data to determine grid parameters.
 * @param candles - Array of CandleData (historical candles)
 * @param gridCount - Number of grid levels (default: 10)
 * @param gridSpread - Percentage spread for grid (default: 0.5 = 50%)
 */
export function analyzeCandlesForGrid(
  candles: CandleData[],
  gridCount: number = 10,
  gridSpread: number = 0.5
): GridAnalysisResult {
  const closes = candles.map(c => parseFloat(c.close));
  const minPrice = Math.min(...closes);
  const maxPrice = Math.max(...closes);
  const avgPrice = closes.reduce((a, b) => a + b, 0) / closes.length;

  // Simple volatility: standard deviation of closes
  const mean = avgPrice;
  const variance = closes.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / closes.length;
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
  };
}
