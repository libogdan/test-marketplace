export const Products = {
  get: "/products",
  create: "/products",
  update: (id: string) => `/products/${id}`,
  delete: (id: string) => `/products/${id}`,
};
