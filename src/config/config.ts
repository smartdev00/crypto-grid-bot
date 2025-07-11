import config from './settings.json';

export const BASE_URL = 'https://api.bitget.com/api/v2/spot/market';

export const SYMBOLS = config.symbols;

export const GRID_COUNT = config.settings.grid_count;
export const GRID_SPREAD = config.settings.grid_spread;

export const BATCH_SIZE = 20;
export const DELAY_BETWEEN_BATCHES_MS = 1100; // Slightly over 1s to be safe
export const GRANULARITY = '1h'; // (1min, 5min, 15min, 30min, 1h, 4h, 6h, 12h, 1day, 3day, 1week, 1M)
export const LIMIT_TO_FETCH_CANDLE = 100;
