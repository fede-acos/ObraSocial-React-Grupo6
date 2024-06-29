import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Providers from "./providers/Providers.tsx";
import CartillaMedica from "./pages/cartillaMedica.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <CartillaMedica />
      <App />
    </Providers>
  </React.StrictMode>
);
