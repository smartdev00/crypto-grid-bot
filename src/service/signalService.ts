import { httpPost } from '../api/http';
import { logger } from '../utils/logger';

/**
 * Send a buy signal to the backend API.
 * @param endpoint - The backend API endpoint URL.
 * @param signalData - The data to send (order info, price, etc.)
 */
export async function sendBuySignal(endpoint: string, signalData: any) {
  logger.info('Buy signal', signalData);
  return httpPost(endpoint, { ...signalData, side: 'buy' });
}

/**
 * Send a sell signal to the backend API.
 * @param endpoint - The backend API endpoint URL.
 * @param signalData - The data to send (order info, price, etc.)
 */
export async function sendSellSignal(endpoint: string, signalData: any) {
  logger.info('Sell signal', signalData);
  return httpPost(endpoint, { ...signalData, side: 'sell' });
}
