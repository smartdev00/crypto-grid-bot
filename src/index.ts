import { fetchCandleData } from './api/bitgetApi';
import { batchFetchAndAnalyzeAllSymbols } from './service/batchAnalysisService';

async function main() {
  await batchFetchAndAnalyzeAllSymbols();
}

main();
