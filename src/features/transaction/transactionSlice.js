import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTransaction,
  getWalletTx,
  pkTransaction,
} from "./transactionAPI";

//For generating user tokens
const userTokens = localStorage.getItem("BSuserTokens");

//The Intial Transaction State
const initialState = {
  tx: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//for creating a transaction
export const newTransaction = createAsyncThunk(
  "transaction/create",
  async (transaction, thunkAPI) => {
    try {
      return await createTransaction(transaction, userTokens);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for getting wallet transactions
export const getWalletTransactions = createAsyncThunk(
  "transaction/getWalletTransactions",
  async (walletId, thunkAPI) => {
    try {
      return await getWalletTx(walletId, userTokens);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for creating a pk transaction
export const pkTrnx = createAsyncThunk(
  "transaction/pk",
  async (transaction, thunkAPI) => {
    try {
      return await pkTransaction(transaction, userTokens);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//Transaction Redux Slice
export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(newTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tx = null;
      })
      .addCase(pkTrnx.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pkTrnx.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(pkTrnx.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tx = null;
      })
      .addCase(getWalletTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWalletTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tx = action.payload;
      })
      .addCase(getWalletTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tx = null;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
