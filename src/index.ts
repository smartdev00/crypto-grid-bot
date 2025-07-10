import axios from 'axios';

const BASE_URL = 'https://api.bitget.com/api/v2/spot/market';

export async function fetchBtcUsdtTicker() {
  try {
    const response = await axios.get(`${BASE_URL}/tickers?symbol=BTCUSDT`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching BTCUSDT ticker:', error.message);
    throw error;
  }
}
