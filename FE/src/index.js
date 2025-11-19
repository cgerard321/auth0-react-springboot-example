import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { AuthProviderWithNavigate } from "./auth-provider-with-navigate";
import "./styles/styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWithNavigate>
        <App />
      </AuthProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
