export const Auth = {
  login: "/auth/login",
  register: "/auth/register",
  me: "/auth/me",
  getCart: "/cart",
  toggleCart: (id: string) => `/cart/${id}`,
};
