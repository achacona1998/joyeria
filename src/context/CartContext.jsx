// src/contexts/CartContext.jsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  addToCart,
  removeItemFromCart,
  removeMultipleItems,
} from "../utils/cartUtils";
import { CartContext } from "./contexto";

// Estado inicial del carrito desde localStorage
const initialState = JSON.parse(localStorage.getItem("cart")) || [];

// Proveedor del carrito
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialState);

  // Función para agregar un ítem al carrito
  const handleAddCart = (item, tipo) => {
    const itemWithTipo = {
      ...item,
      tipo_producto: tipo || "tipo_desconocido", // Añade un valor por defecto si no está definido
    };

    const newCart = addToCart(cart, itemWithTipo);
    setCart(newCart);
  };

  // Función para eliminar un ítem específico del carrito
  const removeFromCart = (item) => {
    const newCart = removeItemFromCart(cart, item);
    setCart(newCart);
  };

  // Función para eliminar múltiples ítems del carrito
  const removeElementsCart = (itemsToRemove) => {
    const newCart = removeMultipleItems(cart, itemsToRemove);
    setCart(newCart);
  };

  const updateCartQuantity = (item, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removeFromCart(item); // Usa la función existente para eliminar el producto
    } else {
      setCart((prevCart) =>
        prevCart.map((producto) =>
          producto === item
            ? { ...producto, cantidadCompra: nuevaCantidad }
            : producto
        )
      );
    }
  };

  // Vaciar todo el carrito
  const vaciar = () => {
    setCart([]);
    toast.info("El carrito ha sido vaciado");
  };

  // Obtener la cantidad de ítems en el carrito
  const getCartLength = () => cart.length;

  // Sincronizar carrito con localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddCart,
        removeFromCart,
        removeElementsCart,
        getCartLength,
        updateCartQuantity,
        vaciar,
      }}>
      {children}
    </CartContext.Provider>
  );
};
