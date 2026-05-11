import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User } from "@/entities/user";

import type { Dto } from "../model/schema";

export const authApi = createApi({
  reducerPath: "auth",
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
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useMeQuery } = authApi;
