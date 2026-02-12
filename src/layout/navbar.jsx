import { useNavigate } from "react-router-dom";
import { Logo } from "./components/RedesSociales";
import { CartContext } from "../context/contexto";
import { useContext, useState, useEffect } from "react";
import { DragCloseDrawer } from "./components/DragCloseDrawer";
import ThemeSwitcher from "./components/switch";
import Moneda from "./components/moneda";
import { Precio } from "../utils/precioUtils";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { getCartLength, removeFromCart, updateCartQuantity, cart } =
    useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aumentarCantidad = (item, cantidadActual) => {
    updateCartQuantity(item, cantidadActual + 1);
  };

  const reducirCantidad = (item, cantidadActual) => {
    if (cantidadActual > 1) {
      updateCartQuantity(item, cantidadActual - 1);
    } else {
      removeFromCart(item);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "h-16 glass shadow-soft" : "h-20 bg-transparent"
        }`}>
        <div className="flex justify-between items-center h-full wrapper">
          <div
            className="transition-transform cursor-pointer hover:scale-105"
            onClick={() => navigate("/")}>
            <Logo
              className={`transition-all duration-300 ${scrolled ? "w-12 h-12" : "w-16 h-16 dark:text-white"}`}
            />
          </div>

          <div className="flex gap-6 items-center">
            <Moneda />
            <ThemeSwitcher />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 group"
              onClick={() => setOpen(true)}>
              <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-gray-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors" />
              <AnimatePresence>
                {getCartLength() > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 flex justify-center items-center w-5 h-5 text-[10px] font-bold text-white rounded-full bg-gold-500 shadow-lg shadow-gold-500/40">
                    {getCartLength()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="flex flex-col p-6 mx-auto max-w-2xl h-full text-dark-800 dark:text-light-100">
          <h1 className="pb-4 mb-8 font-serif text-3xl font-bold text-center border-b border-gold-200">
            Tu Selección
          </h1>

          {getCartLength() === 0 ? (
            <div className="flex flex-col justify-center items-center py-20 opacity-60">
              <ShoppingBag className="mb-4 w-16 h-16 text-gold-300/50" />
              <p className="text-xl font-medium">Tu carrito está vacío</p>
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => {
                  setOpen(false);
                  navigate("/Catalogos");
                }}>
                Explorar Colección
              </Button>
            </div>
          ) : (
            <div className="overflow-y-auto flex-1 pr-2 space-y-4 custom-scrollbar">
              {cart.map((producto) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={producto.id + producto.name}
                  className="flex gap-4 items-center p-4 glass-card bg-white/50 dark:bg-dark-800/50">
                  <img
                    src={producto.photo}
                    alt={producto.name}
                    className="object-cover w-20 h-20 rounded-xl shadow-sm"
                  />

                  <div className="flex-1">
                    <h2 className="mb-1 font-serif text-lg font-bold leading-tight">
                      {producto.name}
                    </h2>
                    <div className="font-medium text-gold-500">
                      <Precio precio={producto.precio_unidad} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-center px-1 py-2 rounded-full bg-light-100 dark:bg-dark-700">
                    <button
                      onClick={() =>
                        aumentarCantidad(producto, producto.cantidadCompra)
                      }
                      disabled={
                        producto.cantidadCompra === producto.cantUnidades
                      }
                      className="flex justify-center items-center w-6 h-6 rounded-full transition-colors hover:bg-gold-200 text-dark-800 disabled:opacity-30">
                      +
                    </button>
                    <span className="w-4 text-sm font-bold text-center">
                      {producto.cantidadCompra}
                    </span>
                    <button
                      onClick={() =>
                        reducirCantidad(producto, producto.cantidadCompra)
                      }
                      className="flex justify-center items-center w-6 h-6 text-red-500 rounded-full transition-colors hover:bg-red-100">
                      -
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {getCartLength() > 0 && (
            <div className="pt-6 mt-6 border-t border-gold-200">
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-glow"
                onClick={() => {
                  setOpen(false);
                  navigate("/Compra");
                }}>
                Proceder al Pago
              </Button>
            </div>
          )}
        </div>
      </DragCloseDrawer>
    </>
  );
}
