const { createSlice } = require('@reduxjs/toolkit');
const { register, login, logout, refreshUser } = require('./userApi');

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.error = payload.error;
        state.isLoading = false;
      })
      .addCase(login.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(refreshUser.pending, (state, { payload }) => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
        state.isRefreshing = false;
      });
  },
});

export const authSlice = authReducer.reducer;
