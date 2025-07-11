export interface GridLevel {
  price: number;
  orderId?: string;
  status: 'idle' | 'buy-placed' | 'sell-placed' | 'filled';
}

export interface SymbolGridState {
  symbol: string;
  grids: GridLevel[];
  lastPrice: number;
  upperPrice: number;
  lowerPrice: number;
  centerPrice: number;
  volatility: number;
}

export type AllSymbolsState = Map<string, SymbolGridState>;
