import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/features/auth/api/auth-api";
import { authSlice } from "@/features/auth/model/auth-slice";
import { productsApi } from "@/features/products";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
