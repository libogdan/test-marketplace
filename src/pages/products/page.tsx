import { Container, Section } from "@/shared/ui";
import { useGetAllProductsQuery } from "@/features/products";
import { ProductCard, ProductCardSkeleton } from "@/entities/products";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.tsx";

export const Page = () => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useGetAllProductsQuery({ page, perPage: 10 });
  return (
    <Container>
      <Section>
        <div className="grid grid-cols-5 gap-4">
          {isFetching &&
            new Array(10)
              .fill(0)
              .map((_, i) => <ProductCardSkeleton key={i} />)}

          {!isFetching &&
            data?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>

        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem onClick={() => setPage((prev) => prev - 1)}>
                <PaginationPrevious text="Назад" />
              </PaginationItem>

              <PaginationItem onClick={() => setPage(1)}>
                <PaginationLink isActive={page === 1}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem onClick={() => setPage(2)}>
                <PaginationLink isActive={page === 2}>2</PaginationLink>
              </PaginationItem>
              <PaginationItem onClick={() => setPage(3)}>
                <PaginationLink isActive={page === 3}>3</PaginationLink>
              </PaginationItem>
              <PaginationItem onClick={() => setPage(4)}>
                <PaginationLink isActive={page === 4}>4</PaginationLink>
              </PaginationItem>

              <PaginationItem onClick={() => setPage((prev) => prev + 1)}>
                <PaginationNext text="Вперёд" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Section>
    </Container>
  );
};
