import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Providers from "./providers/Providers.tsx";
import ListaEspecialistas from "./modules/listaEspecialistas.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <ListaEspecialistas />
      <App />
    </Providers>
  </React.StrictMode>
);
