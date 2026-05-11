import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Product } from "@/entities/products";
import type { Dto } from "@/features/products";
import type { RootState } from "@/shared/model/store";
import type { PaginationMetadata } from "@/shared/model/types";

export const productsApi = createApi({
  reducerPath: "products",
  tagTypes: ["product"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      { data: Product[] } & { meta: PaginationMetadata },
      {
        page?: number;
        perPage?: number;
        category?: string;
        search?: string;
        priceFrom?: string;
        priceTo?: string;
      } | void
    >({
      query: (arg) => {
        const { page = 1, perPage = 10 } = arg ?? {};

        const query = new URLSearchParams();

        query.append("page", page.toString());
        query.append("limit", perPage.toString());

        if (arg?.category) {
          query.append("category", arg.category);
        }
        if (arg?.search) {
          query.append("search", arg.search);
        }
        if (arg?.priceFrom) {
          query.append("priceFrom", arg.priceFrom);
        }
        if (arg?.priceTo) {
          query.append("priceTo", arg.priceTo);
        }

        return `/products?${query.toString()}`;
      },
      providesTags: ["product"],
    }),
    createProduct: builder.mutation<void, Dto>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<void, { id: string; data: Dto }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
