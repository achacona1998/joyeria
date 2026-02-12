export const getCardColor = (tarjeta) => {
  const cleanNumber = tarjeta?.replace(/\D/g, "") || ""; // Elimina todo excepto números
  const secondGroup = cleanNumber.slice(4, 8); // Obtén el segundo grupo de 4 dígitos

  if (secondGroup === "1299") {
    return {
      container: "bg-slate-100", // Fondo del contenedor
      numbers: "bg-primaryGreen", // Fondo de los números
    };
  } else if (secondGroup === "0699") {
    return {
      container: "bg-primaryRed",
      numbers: "bg-gray-300/20",
    };
  } else if (secondGroup === "9598") {
    return {
      container: "bg-primaryGray",
      numbers: "bg-primaryGreen2",
    };
  } else {
    return {
      container: "bg-blue-700",
      numbers: "bg-blue-300",
    };
  }
};
