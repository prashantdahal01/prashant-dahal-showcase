import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";
import "./styles.css";

const container = document.getElementById("root");

if (container) {
  const router = getRouter();
  createRoot(container).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
} else {
  // Start renders the document; the separate static build renders #root.
  void import("@tanstack/react-start/client").then(({ StartClient }) => {
    startTransition(() => {
      hydrateRoot(document, <StrictMode><StartClient /></StrictMode>);
    });
  });
}
