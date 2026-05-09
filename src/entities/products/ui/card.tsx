import { Link } from "react-router";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx";
import type { Product } from "@/entities/products";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
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

        <CardFooter>
          <p>{product.price.toFixed(2)} $</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
