import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCoins,
  createTransaction,
  createWallet,
  getUserWallet,
  getWallet,
  importWallet,
  pkTransaction,
} from "./walletAPI";

//For generating user tokens
const userTokens = localStorage.getItem("BSuserTokens");

//The Initial Wallet State
const initialState = {
  wallets: null,
  wallet: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  activeId: 0,
  values: [0],
};

//for creating a new wallet
export const newWallet = createAsyncThunk(
  "wallet/create",
  async (wallet, thunkAPI) => {
    try {
      return await createWallet(wallet);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for importing a new wallet
export const impWallet = createAsyncThunk(
  "wallet/import",
  async (wallet, thunkAPI) => {
    try {
      return await importWallet(wallet);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//get a particular wallet by ID
export const idWallet = createAsyncThunk(
  "wallet/getWallet",
  async (id, thunkAPI) => {
    try {
      return await getWallet(id, userTokens);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//to get user wallets
export const userWallet = createAsyncThunk(
  "wallet/userwallet",
  async (user, thunkAPI) => {
    try {
      return await getUserWallet(user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//Setting Wallet
export const setWallet = createAsyncThunk(
  "wallet/setwallet",
  async (wallet, thunkAPI) => {
    try {
      return wallet;
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for transaction in wallet
export const txWallet = createAsyncThunk(
  "wallet/txwallet",
  async ({ info, user }, thunkAPI) => {
    try {
      return await createTransaction(info, user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//For adding new coin to Wallet
export const addToken = createAsyncThunk(
  "wallet/addcoins",
  async ({ info, user }, thunkAPI) => {
    try {
      return await addCoins(info, user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//for transaction in wallet
export const pkWallet = createAsyncThunk(
  "wallet/pkwallet",
  async ({ info, user }, thunkAPI) => {
    try {
      return await pkTransaction(info, user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//Wallet Redux slice
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    addWalletBalance: (state, action) => {
      state.values.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(newWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(impWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(impWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(impWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(idWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(idWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wallet = action.payload;
      })
      .addCase(idWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(userWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wallets = action.payload;
        state.wallet = {
          ...action.payload[state.activeId],
          index: state.activeId,
        };
      })
      .addCase(userWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wallet = action.payload;
        state.activeId = action.payload.index;
        state.values = [0];
      })
      .addCase(setWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(txWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(txWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(txWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(pkWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pkWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(pkWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(addToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, addWalletBalance } = walletSlice.actions;
export default walletSlice.reducer;
