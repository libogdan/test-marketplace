import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/entities/user";

interface AuthState {
  token: string | null;
  user: User | null;

  isOpenOrder: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,

  isOpenOrder: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    openOrder: (state: AuthState) => {
      state.isOpenOrder = true;
    },
    closeOrder: (state: AuthState) => {
      state.isOpenOrder = false;
    },
    setCredentials: (
      state,
      { payload }: PayloadAction<{ token: string; user: User }>,
    ) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { openOrder, closeOrder, setCredentials, logout } =
  authSlice.actions;
