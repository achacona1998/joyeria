export const formatPrecioParaTextarea = (precio, moneda) => {
  let resultado;
  if (moneda === "cup") {
    resultado = precio;
  } else if (moneda === "usd") {
    resultado = precio / 340;
  } else {
    resultado = precio / 280;
  }

  // Redondear a 2 decimales
  return `$ ${parseFloat(resultado.toFixed(2))}`;
};
