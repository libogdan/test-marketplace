import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User } from "@/entities/user";

import type { Dto } from "../model/schema";
import type { Product } from "@/entities/products";

export const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Me", "cart"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string; user: User }, Dto>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation<void, void>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    me: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Me"],
    }),
    getCart: builder.query<Product[], void>({
      query: () => ({
        url: "/cart",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["cart"],
    }),
    toggleCart: builder.mutation<void, string>({
      query: (productId) => ({
        url: "/cart/" + productId,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Me", "cart"],
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
