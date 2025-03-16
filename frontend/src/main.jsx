import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import { FiltersProvider } from "./context/FilterProvoder.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FiltersProvider>
          <App />
        </FiltersProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
