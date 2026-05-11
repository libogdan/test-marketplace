import { BrowserRouter, Route, Routes } from "react-router";

import { AuthProvider } from "@/features/auth";
import { AdminProductsPage } from "@/pages/admin/products";
import { SignInPage } from "@/pages/auth/signin";
import { SignUpPage } from "@/pages/auth/signup";
import { CartPage } from "@/pages/cart";
import { HomePage } from "@/pages/home";
import { ProductsPage } from "@/pages/products";
import { PurchasePage } from "@/pages/purchase";
import { Layout } from "@/shared/layout";

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="purchase" element={<PurchasePage />} />

            <Route path="auth">
              <Route path="signin" element={<SignInPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>

            <Route path="admin">
              <Route path="products" element={<AdminProductsPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
