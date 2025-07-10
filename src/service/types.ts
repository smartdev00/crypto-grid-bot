import { GridAnalysisResult } from './analysisService';

export interface BatchAnalyzeResult {
  symbol: string;
  analysis?: GridAnalysisResult | undefined;
  error?: undefined | unknown;
}
