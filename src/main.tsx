import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Router } from "@/app/providers/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
);
