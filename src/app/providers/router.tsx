import { BrowserRouter, Route, Routes } from "react-router";

import { AuthProvider, OrderDialog } from "@/features/auth";
import { AdminProductsPage } from "@/pages/admin/products";
import { SignInPage } from "@/pages/auth/signin";
import { SignUpPage } from "@/pages/auth/signup";
import { CartPage } from "@/pages/cart";
import { HomePage } from "@/pages/home";
import { ProductsPage } from "@/pages/products";
import { Layout } from "@/shared/layout";
import { ErrorBoundary } from "@/shared/ui";

import { RequireAuth } from "./require-auth";

export const Router = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <OrderDialog />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route
                path="cart"
                element={
                  <RequireAuth>
                    <CartPage />
                  </RequireAuth>
                }
              />

              <Route path="auth">
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup" element={<SignUpPage />} />
              </Route>

              <Route path="admin">
                <Route
                  path="products"
                  element={
                    <RequireAuth>
                      <AdminProductsPage />
                    </RequireAuth>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
