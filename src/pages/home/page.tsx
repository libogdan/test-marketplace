import { ProductsList } from "@/entities/products";
import { useGetAllProductsQuery } from "@/features/products";
import { Container, Section } from "@/shared/ui";

export const Page = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  return (
    <Container>
      <Section>
        <h1 className="mb-4 text-xl font-semibold">Рекоммендуемые товары</h1>

        <ProductsList
          data={data?.data}
          isAdmin={false}
          isLoading={isLoading}
          isError={isError}
          hasPagination={false}
        />
      </Section>
    </Container>
  );
};
