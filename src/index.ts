import { GRID_COUNT, SYMBOLS } from './config/config';
import { fetchCandleData } from './api/bitgetApi';
import { batchFetchAndAnalyzeAllSymbols } from './service/batchAnalysisService';
import { GridManager } from './core/gridManager';
import { logger } from './utils/logger';
import { checkAndBuyOnGridBatch } from './service/gridBotService';

async function main() {
  const analysis = await batchFetchAndAnalyzeAllSymbols();
  logger.info('Analysis data', analysis);

  const gridManager = new GridManager(GRID_COUNT - 1, analysis);
  gridManager.log();

  await checkAndBuyOnGridBatch(gridManager);
}

main();
