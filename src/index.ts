import { fetchCandleData } from './api/bitgetApi';

async function main() {
  console.log((await fetchCandleData()).data.length);
}

// main();
