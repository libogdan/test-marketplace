import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Product } from "@/entities/products";
import type { User } from "@/entities/user";
import type { RootState } from "@/shared/model/store";

import type { Dto } from "../model/schema";
import { ApiPaths } from "@/shared/api/paths";

export const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["me", "cart"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string; user: User }, Dto>({
      query: (body) => ({
        url: ApiPaths.auth.login,
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation<void, Dto>({
      query: (body) => ({
        url: ApiPaths.auth.register,
        method: "POST",
        body,
      }),
    }),
    me: builder.query<User, void>({
      query: () => ({
        url: ApiPaths.auth.me,
      }),
      providesTags: ["me"],
    }),
    getCart: builder.query<Product[], void>({
      query: () => ({
        url: ApiPaths.auth.getCart,
      }),
      providesTags: ["cart"],
    }),
    toggleCart: builder.mutation<void, string>({
      query: (productId) => ({
        url: ApiPaths.auth.toggleCart(productId),
        method: "POST",
      }),
      invalidatesTags: ["me", "cart"],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetCartQuery,
  useToggleCartMutation,
  useMeQuery,
} = authApi;
