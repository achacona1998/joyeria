import useCounts from "../../../hooks/count";
import { Items } from "./items";

// Preparar una lista para almacenar los datos de conteo
export const itemsConCount = Items.map((item) => {
  const joyaSinS = item.name.slice(0, -1).toLowerCase();
  return {
    ...item,
    count: useCounts(joyaSinS).count, // Llamada directa al hook por cada elemento
  };
});
