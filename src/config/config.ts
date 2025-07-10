import config from './settings.json';

export const BASE_URL = 'https://api.bitget.com/api/v2/spot/market';

export const SYMBOLS = config.symbols;

export const GRID_COUNT = 10;
export const GRID_SPREAD = 0.5;

export const BATCH_SIZE = 20;
export const DELAY_BETWEEN_BATCHES_MS = 1100; // Slightly over 1s to be safe
