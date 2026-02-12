import { useState, useEffect } from "react";
import { MonedaContext } from "./contexto";

// Estado inicial del carrito desde localStorage
const initialState = JSON.parse(localStorage.getItem("moneda")) || "cup";

// Proveedor del carrito
// eslint-disable-next-line react/prop-types
export const MonedaProvider = ({ children }) => {
  const [moneda, setMoneda] = useState(initialState);

  // Sincronizar carrito con localStorage
  useEffect(() => {
    localStorage.setItem("moneda", JSON.stringify(moneda));
  }, [moneda]);

  return (
    <MonedaContext.Provider
      value={{
        moneda,
        setMoneda,
      }}>
      {children}
    </MonedaContext.Provider>
  );
};
