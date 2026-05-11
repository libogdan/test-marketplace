import { Delete, Edit, ShoppingBasket } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Product } from "@/entities/products";
import { useToggleCartMutation } from "@/features/auth/api/auth-api";
import { openDelete, openUpdate } from "@/features/products";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";

interface Props {
  product: Product;
  additionalContent?: ReactNode;
  isAdmin?: boolean;
}

export const ProductCard = ({
  product,
  additionalContent,
  isAdmin = false,
}: Props) => {
  const { user } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
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

          {additionalContent && <div className="mt-2">{additionalContent}</div>}
        </CardContent>

        <CardFooter className="flex justify-between">
          <p>{product.price.toFixed(2)} $</p>

          {user && user?.cart && !isAdmin && (
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

          {isAdmin && (
            <div>
              <Button
                size="icon-lg"
                variant="link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  dispatch(openUpdate(product));
                }}
              >
                <Edit />
              </Button>
              <Button
                size="icon-lg"
                variant="link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  dispatch(openDelete(product));
                }}
              >
                <Delete />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
