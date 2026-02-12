import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { MonedaProvider } from "./context/MonedaContext.jsx";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <MonedaProvider>
      <App />
    </MonedaProvider>
  </CartProvider>
);
