import { Link } from "react-router";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import type { Product } from "@/entities/products";
import { Button } from "@/components/ui/button.tsx";
import { ShoppingBasket } from "lucide-react";
import { useAppSelector } from "@/shared/model/hooks.ts";
import { useToggleCartMutation } from "@/features/auth/api/auth-api.ts";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { user } = useAppSelector((state) => state.authSlice);
  const [toggleCart, { isLoading }] = useToggleCartMutation();

  return (
    <Link to={`/products/${product.id}`} className="block">
      <Card className="group flex h-full flex-col justify-between hover:bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-36 w-full object-cover transition group-hover:scale-105"
        />

        <CardHeader>{product.name}</CardHeader>

        <CardContent>
          <p>{product.description}</p>
        </CardContent>

        <CardFooter className="flex justify-between">
          <p>{product.price.toFixed(2)} $</p>
          {user && user?.cart && (
            <Button
              size="icon-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                toggleCart(product.id);
              }}
              disabled={isLoading}
              variant={user.cart.includes(product.id) ? "outline" : "default"}
            >
              <ShoppingBasket />
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
