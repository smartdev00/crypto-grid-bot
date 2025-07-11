import { fetchSymbolTicker } from '../api/bitgetApi';
import { sendBuySignal, sendSellSignal } from '../service/signalService';
import { logger } from '../utils/logger';
import { GridManager } from '../core/gridManager';
import { BATCH_SIZE, DELAY_BETWEEN_BATCHES_MS } from '../config/config';
import { sleep } from '../utils/helpers';

let count = 0;

export async function processGridBatchesOnce(gridManager: GridManager) {
  const symbols = Array.from(gridManager['state'].keys());
  logger.info(`The length of analyzed symbols: ${symbols.length}`);
  count++;

  console.log(`=================== ${count} ===================`);

  for (let i = 0; i < symbols.length; i += BATCH_SIZE) {
    const batch = symbols.slice(i, i + BATCH_SIZE);

    // Fetch all tickers in parallel for this batch
    const tickerPromises = batch.map((symbol) =>
      fetchSymbolTicker(symbol).then(
        (tickerRes) => ({ symbol, tickerRes }),
        (error) => ({ symbol, error })
      )
    );
    const tickerResults = await Promise.all(tickerPromises);

    // Process each symbol in the batch
    for (const result of tickerResults) {
      const { symbol } = result;
      if ('error' in result) {
        logger.error(`Failed to fetch ticker for ${symbol}`, result.error);
        continue;
      }

      const tickerRes = result.tickerRes;
      const symbolState = gridManager.getSymbolState(symbol);
      if (!symbolState) continue;

      const currentPrice = parseFloat(tickerRes.data[0].lastPr);
      logger.info(`Current Price of ${symbol} is $${currentPrice}`);

      if (symbolState.lastPrice === 0) {
        logger.info('Last price is $0');
        symbolState.lastPrice = currentPrice;
        continue;
      }

      if (currentPrice < symbolState.lowerPrice || currentPrice > symbolState.upperPrice) {
        logger.info(`Current price is out of range. ${symbol}: $${currentPrice}`);
        continue;
      }

      symbolState.grids.forEach((grid, i) => {
        // Send buy signal and log
        if (currentPrice < symbolState.centerPrice) {
          if (
            (symbolState.lastPrice >= grid.price &&
              currentPrice <= grid.price &&
              grid.status === 'idle') ||
            (symbolState.lastPrice <= grid.price &&
              currentPrice >= grid.price &&
              grid.status === 'idle')
          ) {
            logger.info(`Buy triggered for ${symbol} at grid ${i} (price: ${grid.price})`, {
              currentPrice,
            });
            gridManager.updateGrid(symbol, i, { status: 'buy-placed' });
            sendBuySignal('YOUR_BACKEND_ENDPOINT', {
              symbol,
              price: grid.price,
              gridIndex: i,
              currentPrice,
            });
          }
        }

        // Send sell signal and log
        if (i > 0) {
          if (symbolState.grids[i - 1].status === 'buy-placed' && currentPrice >= grid.price) {
            logger.info(`Sell triggered for ${symbol} at grid ${i} (price: ${grid.price})`, {
              currentPrice,
            });
            gridManager.updateGrid(symbol, i, { status: 'sell-placed' });
            sendSellSignal('YOUR_BACKEND_ENDPOINT', {
              symbol,
              price: grid.price,
              gridIndex: i,
              currentPrice,
            });
          }
        }
      });

      gridManager.updateLastPrice(symbol, currentPrice);
    }

    // Wait before next batch if there are more symbols
    if (i + BATCH_SIZE < symbols.length) {
      await sleep(DELAY_BETWEEN_BATCHES_MS);
    }
  }
  gridManager.log();
}

export async function checkAndBuyOnGridBatch(gridManager: GridManager) {
  while (true) {
    await processGridBatchesOnce(gridManager);
  }
}
