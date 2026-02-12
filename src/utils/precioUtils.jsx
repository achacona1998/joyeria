import { useContext } from "react";
import { MonedaContext } from "../context/contexto";

// eslint-disable-next-line react/prop-types
export const Precio = ({ precio }) => {
  const { moneda } = useContext(MonedaContext);

  let resultado;
  if (moneda === "cup") {
    resultado = precio;
  } else if (moneda === "usd") {
    resultado = precio / 340;
  } else {
    resultado = precio / 280;
  }

  // Redondear a 2 decimales
  return <span>$ {parseFloat(resultado.toFixed(2))}</span>;
};

