import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { ProductsList } from "@/entities/products";
import {
  CreateProductDialog,
  DeleteProductDialog,
  openCreate,
  UpdateProductDialog,
  useGetAllProductsQuery,
} from "@/features/products";
import { Container, Section } from "@/shared/ui";
import { Filters } from "@/widgets/filter";

export const Page = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

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
    <>
      <Container>
        <Section>
          <Button className="mb-4" onClick={() => dispatch(openCreate())}>
            Добавить продукт
          </Button>

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

      <CreateProductDialog />
      <UpdateProductDialog />
      <DeleteProductDialog />
    </>
  );
};
