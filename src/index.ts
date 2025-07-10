import { GRID_COUNT, SYMBOLS } from './config/config';
import { fetchCandleData } from './api/bitgetApi';
import { batchFetchAndAnalyzeAllSymbols } from './service/batchAnalysisService';
import { GridManager } from './core/GridManager';
import { logger } from './utils/logger';

async function main() {
  const analysis = await batchFetchAndAnalyzeAllSymbols();
  logger.info('Analysis data', analysis);

  const gridManager = new GridManager(GRID_COUNT - 1, analysis);

  // Set grid prices for a symbol
  // gridManager.setGridPrices('BTCUSDT', [10000, 10100, 10200]);
  // gridManager.setGridPricesFromAnalyze(analysis);

  // Update a grid's status
  gridManager.updateGrid('BTCUSDT', 0, { status: 'buy-placed', orderId: '12345' });

  // Access all grid states
  gridManager.log();
}

main();
