import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Router } from "@/app/providers/router";
import { StoreProvider } from "@/app/providers/store-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <Router />
    </StoreProvider>
  </StrictMode>,
);
