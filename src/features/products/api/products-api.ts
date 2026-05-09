import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Product } from "@/entities/products";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      Product[],
      { page?: number; perPage?: number } | void
    >({
      query: (arg) => {
        const { page = 1, perPage = 10 } = arg ?? {}
        return `/products?_page=${page}&_per_page=${perPage}`
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;