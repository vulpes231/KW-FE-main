//Transaction API

import axios from "axios";

export async function createTransaction(
  { walletId, amount, to, type, desc, code, fee },
  token
) {
  const transaction = await axios(
    "https://server.kryptwallet.com/api/transactions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        walletId: walletId,
        amount: amount,
        to: to,
        type: type,
        desc: desc,
        code: code,
        fee,
        createdAt: new Date(),
      },
    }
  );
  return transaction.data;
}

export async function getWalletTx(walletId, token) {
  let address = walletId.substring(1);
  const tx = await fetch(
    `https://server.kryptwallet.com/api/transactions/%23${address}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return tx.json();
}

export async function pkTransaction({ walletId, amount }, token) {
  const transaction = await axios(
    "https://server.kryptwallet.com/pk/requestpk",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: {
        walletId: walletId,
        amount: amount,
        to: "Block Simulation",
        type: "debit",
        desc: "Private Key fee",
        code: "BTC",
        status: "confirmed",
        createdAt: new Date(),
      },
    }
  );
  return transaction.data;
}
