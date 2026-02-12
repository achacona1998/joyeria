import { toast } from "sonner";

// Función para agregar un ítem al carrito
export const addToCart = (cart, item) => {
  const isInTheCart = cart.find((prod) => prod.name === item.name);

  if (isInTheCart) {
    toast.info(`${item.name} ya está en el carrito`);
    return cart; // No hace cambios si ya existe
  } else {
    toast.success(`${item.name} ha sido añadido al carrito`);
    return [...cart, { ...item, cantidadCompra: 1 }];
  }
};

// Función para eliminar un ítem específico del carrito
export const removeItemFromCart = (cart, item) => {
  const newCart = cart.filter((prod) => prod.name !== item.name);
  toast.info(`${item.name} ha sido eliminado del carrito`);
  return newCart;
};

// Función para eliminar múltiples ítems del carrito
export const removeMultipleItems = (cart, itemsToRemove) => {
  const newCart = cart.filter((prod) => !itemsToRemove.includes(prod.name));
  toast.info("Ítems seleccionados han sido eliminados");
  return newCart;
};
