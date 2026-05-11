import type { Product } from "@/entities/products";

export interface User {
  id: string;
  email: string;
  role: string;
  cart: string[];
}
