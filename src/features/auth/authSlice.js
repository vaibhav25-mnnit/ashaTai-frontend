import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../app/constants";
import { createUserAPi, loginUserApi, updateUserApi } from "./authApi";

const initialState = {
  user: null,
  error: null,
  status: STATUS.IDEAL,
};

//Api to create new user for signup page
export const createUser = createAsyncThunk("auth/createUser", async (data) => {
  const response = await createUserAPi(data);
  return response;
});

//Api to verify loging user for login page
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  const response = await loginUserApi(data); 
  return response;
});

//to update the user info
export const updateUser = createAsyncThunk("auth/updateUser", async (data) => {
  const response = await updateUserApi(data);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.error = null;
      state.status = STATUS.IDEAL;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(createUser.fulfilled, (state, action) => { 
        state.user = action.payload.user;
        state.error = action.payload.message;
        state.status = STATUS.IDEAL;
      })
      .addCase(createUser.rejected, (state, action) => {
  
        state.error = action.error.message;
        state.status = STATUS.ERROR;
      })

      .addCase(loginUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log(action)
        state.user = action.payload.data;
        state.error = null;
        state.status = STATUS.IDEAL;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = STATUS.ERROR;
      })

      .addCase(updateUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => { 
        state.user = action.payload.data;
        state.error = null;
        state.status = STATUS.IDEAL;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = STATUS.ERROR;
      });
  },
});

export default authSlice.reducer;

export const { resetUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
