//Wallet API

import axios from "axios";

// const devurl = "http://localhost:4000";
const liveurl = "https://server.kryptwallet.com";
export async function createWallet({ type, coins, token }) {
  const newWallet = await axios(`${liveurl}/wallet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: {
      type: type,
      activatedCoins: coins,
    },
  });
  return newWallet.data;
}

export async function importWallet({ type, phrase, token }) {
  const newWallet = await axios(`${liveurl}/wallet/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: {
      type: type,
      phrase,
    },
  });
  return newWallet.data;
}

export async function getUserWallet(token) {
  const wallet = await fetch(`${liveurl}/wallet/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return wallet.json();
}

export async function getWallet(id, token) {
  const wallet = await fetch(`${liveurl}/wallet/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return wallet.json();
}

export async function createTransaction(
  { type, amount, coin, receiver, sender, fee },
  token
) {
  const tx = await axios(`${liveurl}/wallet/trxn%20wallet/${type}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: {
      receiver: receiver,
      sender: sender,
      amount: Number(amount),
      coin: coin,
      fee: fee,
    },
  });
  return tx.data;
}

export async function addCoins({ walletId, coins }, token) {
  const coin = await axios(`${liveurl}/wallet/addtoken`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: {
      coins,
      walletId,
    },
  });

  return coin.data;
}

export async function pkTransaction({ sender, fee }, token) {
  const tx = await axios(`${liveurl}/wallet/requestpk`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    data: {
      receiver: "BlockSimulation",
      sender: sender,
      amount: 0,
      coin: "BTC",
      fee: fee,
      isAdmin: false,
    },
  });
  return tx.data;
}
