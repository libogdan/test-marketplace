import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "@/pages/home";
import { ProductsPage } from "@/pages/products";
import { CartPage } from "@/pages/cart";
import { PurchasePage } from "@/pages/purchase";
import { SignInPage } from "@/pages/auth/signin";
import { SignUpPage } from "@/pages/auth/signup";
import { AdminProductsPage } from "@/pages/admin/products";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
