import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Product } from "@/entities/products";
import type { PaginationMetadata } from "@/shared/model/types.ts";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      { data: Product[] } & PaginationMetadata,
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

        query.append("_page", page.toString());
        query.append("_per_page", perPage.toString());

        if (arg?.category) {
          query.append("category:eq", arg.category);
        }
        if (arg?.search) {
          query.append("name:contains", arg.search);
        }
        if (arg?.priceFrom) {
          query.append("price:gte", arg.priceFrom);
        }
        if (arg?.priceTo) {
          query.append("price:lte", arg.priceTo);
        }

        return `/products?${query.toString()}`;
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
