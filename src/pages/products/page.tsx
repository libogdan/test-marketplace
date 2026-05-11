import { useState } from "react";
import { useSearchParams } from "react-router";

import { ProductsList } from "@/entities/products";
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

  const { data, isLoading, isError } = useGetAllProductsQuery({
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

        <ProductsList
          data={data?.data}
          isAdmin={false}
          isLoading={isLoading}
          isError={isError}
          hasPagination
          page={page}
          setPage={setPage}
          meta={data?.meta}
        />
      </Section>
    </Container>
  );
};
