import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import walletReducer from "../features/wallet/walletSlice";
import coinReducer from "../features/coin/coinSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    wallet: walletReducer,
    coin: coinReducer,
    transaction: transactionReducer,
  },
});
