export interface GridAnalysisResult {
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  volatility: number;
  gridLower: number;
  gridUpper: number;
  gridStep: number;
  currentPrice: number;
}

export interface BatchAnalyzeResult {
  symbol: string;
  analysis?: GridAnalysisResult | undefined;
  error?: undefined | unknown;
}
