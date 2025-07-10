import {
  BATCH_SIZE,
  DELAY_BETWEEN_BATCHES_MS,
  GRID_COUNT,
  GRID_SPREAD,
  SYMBOLS,
} from '../config/config';
import { fetchCandleData } from '../api/bitgetApi';
import { analyzeCandlesForGrid } from './analysisService';
import { logger } from '../utils/logger';
import { sleep } from '../utils/helpers';
import { BatchAnalyzeResult } from './types';

export async function batchFetchAndAnalyzeAllSymbols(): Promise<BatchAnalyzeResult[]> {
  const analysis = [];
  console.log(SYMBOLS);
  for (let i = 0; i < SYMBOLS.length; i += BATCH_SIZE) {
    const batch = SYMBOLS.slice(i, i + BATCH_SIZE);

    // logger.info(`Processing batch: ${batch.join(', ')}`);

    const promises = batch.map(async (symbol) => {
      try {
        const candleRes = await fetchCandleData(symbol.symbol, '1h', Date.now(), 100);
        const analysis = analyzeCandlesForGrid(candleRes.data, GRID_COUNT, GRID_SPREAD);
        // logger.info(`Analysis for ${symbol.symbol}`, analysis);

        return { symbol: symbol.symbol, analysis };
      } catch (err) {
        // logger.error(`Failed to process ${symbol.symbol}`, err);

        return { symbol: symbol.symbol, error: err };
      }
    });

    analysis.push(...(await Promise.all(promises)));

    if (i + BATCH_SIZE < SYMBOLS.length) {
      logger.info('Waiting before next batch...');
      await sleep(DELAY_BETWEEN_BATCHES_MS);
    }
  }

  // logger.info('Analysis: ', analysis);
  return analysis;
}
