import { useState } from "react";
import { useSearchParams } from "react-router";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import { ProductCard, ProductCardSkeleton } from "@/entities/products";
import { useGetAllProductsQuery } from "@/features/products";
import { Container, Section } from "@/shared/ui";
import { Filters } from "@/widgets/filter";

export const Page = () => {
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();

  const [category, search, priceFrom, priceTo] = [
    searchParams.get("category") ?? undefined,
    searchParams.get("search") ?? undefined,
    searchParams.get("price_from") ?? undefined,
    searchParams.get("price_to") ?? undefined,
  ];

  const { data, isFetching } = useGetAllProductsQuery({
    page,
    perPage: 10,
    category,
    search,
    priceFrom,
    priceTo,
  });
  return (
    <Container>
      <Section>
        <Filters />

        <div className="grid grid-cols-5 gap-4">
          {isFetching &&
            new Array(10)
              .fill(0)
              .map((_, i) => <ProductCardSkeleton key={i} />)}

          {!isFetching &&
            data?.data?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>

        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem
                onClick={() => page > 1 && setPage((prev) => prev - 1)}
              >
                <PaginationPrevious text="Назад" />
              </PaginationItem>

              {data &&
                new Array(data?.meta.pages).fill(0).map((_, i) => (
                  <PaginationItem onClick={() => setPage(i + 1)} key={i}>
                    <PaginationLink isActive={page === i + 1}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              <PaginationItem
                onClick={() =>
                  page < (data?.meta.pages || 1) && setPage((prev) => prev + 1)
                }
              >
                <PaginationNext text="Вперёд" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Section>
    </Container>
  );
};
