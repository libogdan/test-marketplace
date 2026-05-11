import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button.tsx";
import { ProductListItem } from "@/entities/products";
import { openOrder } from "@/features/auth";
import { useGetCartQuery } from "@/features/auth/api/auth-api";
import { Container, Section } from "@/shared/ui";

export const Page = () => {
  const { data, isLoading } = useGetCartQuery();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const dispatch = useDispatch();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const { totalPrice, itemCount } = useMemo(() => {
    if (!data) return { totalPrice: 0, itemCount: 0 };

    let total = 0;
    let count = 0;

    data.forEach((product) => {
      const quantity = quantities[product.id] ?? 1;
      total += product.price * quantity;
      count += quantity;
    });

    return { totalPrice: total, itemCount: count };
  }, [data, quantities]);

  return (
    <Container>
      <Section>
        <h1 className="mb-4 text-xl font-semibold">Корзина</h1>

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              {!isLoading &&
                data?.map((product) => (
                  <ProductListItem
                    product={product}
                    key={product.id}
                    quantity={quantities[product.id] ?? 1}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityChange(product.id, newQuantity)
                    }
                  />
                ))}
            </div>
          </div>

          <div className="w-80">
            <div className="sticky top-4 rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Итого</h2>

              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Товаров:</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="font-semibold">Сумма:</span>
                  <span className="text-2xl font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full rounded-lg py-6 font-semibold"
                onClick={() => dispatch(openOrder())}
              >
                Сделать заказ
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
};
