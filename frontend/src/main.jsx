import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./provider/AuthProvider.jsx";
// import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
