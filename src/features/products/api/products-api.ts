import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Product } from "@/entities/products";
import type { PaginationMetadata } from "@/shared/model/types.ts";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
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
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
