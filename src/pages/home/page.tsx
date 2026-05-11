import { ProductCard, ProductCardSkeleton } from "@/entities/products";
import { useGetAllProductsQuery } from "@/features/products";
import { Container, Section } from "@/shared/ui";

export const Page = () => {
  const { data, isFetching } = useGetAllProductsQuery();

  return (
    <Container>
      <Section>
        <h1 className="mb-4 text-xl font-semibold">Рекоммендуемые товары</h1>

        <div className="grid grid-cols-5 gap-4">
          {isFetching &&
            new Array(5).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}

          {!isFetching &&
            data?.data?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </Section>
    </Container>
  );
};
