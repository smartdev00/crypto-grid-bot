import { GRID_COUNT } from './config/config';
import { batchFetchAndAnalyzeAllSymbols } from './service/batchAnalysisService';
import { GridManager } from './core/gridManager';
import { logger } from './utils/logger';
import { checkAndBuyOnGridBatch } from './service/gridBotService';

async function main() {
  const analysis = await batchFetchAndAnalyzeAllSymbols();
  logger.info('Analysis data', analysis);
  logger.info(`The length of analyzed data: ${analysis.length}`);

  const gridManager = new GridManager(GRID_COUNT - 1, analysis);
  gridManager.log();

  await checkAndBuyOnGridBatch(gridManager);
}

main();
