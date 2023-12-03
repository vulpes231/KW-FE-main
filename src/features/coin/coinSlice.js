import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTokens, getValues } from "./coinAPI";

//The Initial Auth State
const initialState = {
  tokens: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  coinValues: null,
};

export const getCoins = createAsyncThunk("coin/get", async (thunkAPI) => {
  try {
    return await getTokens();
  } catch (e) {
    const errMessage =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();
    return thunkAPI.rejectWithValue(errMessage);
  }
});

export const getCoinValues = createAsyncThunk(
  "coin/getValues",
  async (thunkAPI) => {
    try {
      return await getValues();
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//Coins Redux Slice
export const coinSlice = createSlice({
  name: "coin",
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
      .addCase(getCoins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tokens = action.payload;
      })
      .addCase(getCoins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tokens = null;
      })
      .addCase(getCoinValues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoinValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coinValues = action.payload;
      })
      .addCase(getCoinValues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tokens = null;
      });
  },
});

export const { reset } = coinSlice.actions;
export default coinSlice.reducer;
