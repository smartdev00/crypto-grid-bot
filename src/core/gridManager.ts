import { BatchAnalyzeResult, GridAnalysisResult } from '../service/types';
import { logger } from '../utils/logger';
import { AllSymbolsState, SymbolGridState, GridLevel } from './types';

export class GridManager {
  private state: AllSymbolsState = new Map();

  constructor(gridsPerSymbol: number, analysis: BatchAnalyzeResult[]) {
    for (const analyze of analysis) {
      if (analyze.analysis !== undefined) {
        const { analysis: gridAnalysis } = analyze;
        this.state.set(analyze.symbol, {
          symbol: analyze.symbol,
          grids: this.initGrids(gridsPerSymbol, gridAnalysis),
          upperPrice: gridAnalysis.gridUpper,
          lowerPrice: gridAnalysis.gridLower,
          centerPrice: gridAnalysis.avgPrice,
          lastPrice: gridAnalysis.currentPrice,
          volatility: gridAnalysis.volatility,
        });
      } else {
        logger.info(`Analyzing failed: ${analyze.symbol}`);
      }
    }
  }

  private initGrids(count: number, analyze: GridAnalysisResult): GridLevel[] {
    // You can customize grid price initialization as needed
    const grids = Array.from(
      { length: count },
      (_, i) =>
        ({
          price: analyze.gridLower + (i + 1) * analyze.gridStep,
          status: 'idle',
        } as GridLevel)
    );

    return grids;
  }

  getSymbolState(symbol: string): SymbolGridState | undefined {
    return this.state.get(symbol);
  }

  updateGrid(symbol: string, gridIndex: number, update: Partial<GridLevel>) {
    const symbolState = this.state.get(symbol);
    if (!symbolState) return;
    Object.assign(symbolState.grids[gridIndex], update);
  }

  setGridPrices(symbol: string, prices: number[]) {
    const symbolState = this.state.get(symbol);
    if (!symbolState) return;
    symbolState.grids.forEach((grid, i) => {
      grid.price = prices[i];
    });
  }

  setGridPricesFromAnalyze(analysis: BatchAnalyzeResult[]) {
    analysis.forEach((analyze) => {
      if (analyze.analysis != undefined) {
        const { analysis: gridAnalysis } = analyze;
        const symbolState = this.state.get(analyze.symbol);
        symbolState?.grids.forEach((grid, i) => {
          grid.price = gridAnalysis.gridLower + gridAnalysis.gridStep * (i + 1);
        });
      }
    });
  }

  updateLastPrice(symbol: string, price: number) {
    const symbolState = this.state.get(symbol);
    if (!symbolState) return;
    symbolState.lastPrice = price;
  }

  log() {
    this.state.forEach((symbolState) => {
      console.log(`Symbol: ${symbolState.symbol}`);
      console.log(`Upper price: $${symbolState.upperPrice}`);
      console.log(`Lower price: $${symbolState.lowerPrice}`);
      console.log(`Centre price: $${symbolState.centerPrice}`);
      console.log(`Last price: $${symbolState.lastPrice}`);
      console.log(`Volatility: $${symbolState.volatility}`);
      console.log(symbolState.grids);
    });
  }

  // Add more management methods as needed
}
