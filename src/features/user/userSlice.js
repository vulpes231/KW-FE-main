import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authUser,
  createUser,
  getSet,
  logout,
  sendCode,
  setPin,
  verifyEmail,
  verifyPin,
} from "./userAPI";

//For generating user tokens
// const userTokens = localStorage.getItem("BSuserTokens");

//The Initial Auth State
const initialState = {
  user: null,
  info: null,
  setting: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//for Registering New Users
export const registerNewUsers = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      return await createUser(user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// for logging in users
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email }, thunkAPI) => {
    try {
      return await authUser(email);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// For setting user pin
export const setUserPin = createAsyncThunk(
  "user/setpin",
  async ({ pin, user }, thunkAPI) => {
    try {
      return await setPin(pin, user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// for verifing user
export const verifyUser = createAsyncThunk(
  "user/verifyuser",
  async (userTokens, thunkAPI) => {
    try {
      return await verifyEmail(userTokens);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

// for sending code to emails
export const faCode = createAsyncThunk(
  "user/sendcode",
  async (userTokens, thunkAPI) => {
    try {
      return await sendCode(userTokens);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//For logging out
export const authOut = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    return await logout();
  } catch (e) {
    const errMessage =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();
    return thunkAPI.rejectWithValue(errMessage);
  }
});

//for verifying the transaction pin
export const verifyTransactionPin = createAsyncThunk(
  "user/verifypin",
  async ({ pin, user }, thunkAPI) => {
    try {
      return await verifyPin(pin, user);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const getSettings = createAsyncThunk(
  "user/getsettings",
  async (setting, thunkAPI) => {
    try {
      return await getSet(setting);
    } catch (e) {
      const errMessage =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

//User Redux Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerNewUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerNewUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.token;
        state.info = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(setUserPin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUserPin.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(setUserPin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(faCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(faCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(faCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verifyTransactionPin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyTransactionPin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(verifyTransactionPin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.setting = action.payload[0];
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(authOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.user = null;
      })
      .addCase(authOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setUser } = userSlice.actions;
export default userSlice.reducer;
