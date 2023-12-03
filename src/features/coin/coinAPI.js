//Coin API

import axios from "axios";
// https://server.kryptwallet.com
export async function getTokens() {
  const coins = await axios.get("https://server.kryptwallet.com/coin");
  return coins.data;
}

export async function getValues() {
  const Price = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cripple%2Ctether%2Cbitcoin-cash%2Cethereum-classic%2Cdogecoin%2Ctron%2Clitecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false
`
  );
  console.log(Price.data);
  return Price.data;
}
