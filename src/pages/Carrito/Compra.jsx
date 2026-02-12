import { useContext, useState } from "react";
import { CartContext, MonedaContext } from "../../context/contexto";
import { AnimatePresence, motion } from "framer-motion";
import MultiStepForm from "./sections/form";
import { LogoCart } from "./components/Logo";
import { useNavigate } from "react-router-dom";
import { Precio } from "../../utils/precioUtils";
import { formatPrecioParaTextarea } from "../../utils/precio";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Trash2, X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function Compra() {
  const [isOpen, setIsOpen] = useState(false);
  const { vaciar, removeFromCart, updateCartQuantity, cart, getCartLength } =
    useContext(CartContext);
  const navigate = useNavigate();
  const { moneda } = useContext(MonedaContext);

  const calcularSubtotal = () => {
    return cart.reduce(
      (total, producto) =>
        total + producto.precio_unidad * producto.cantidadCompra,
      0,
    );
  };

  const TAX_RATE = 0.16; // 16% de impuestos
  const calcularImpuestos = () => calcularSubtotal() * TAX_RATE;
  const calcularTotal = () => calcularSubtotal() + calcularImpuestos();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="flex flex-col items-center px-4 py-12 min-h-screen bg-gray-50 transition-colors duration-300 md:px-8 dark:bg-black">
        <div className="w-full max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl font-bodoni dark:text-white">
              Carrito de Compras
            </h1>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="font-bodoni">
              ← Volver
            </Button>
          </div>

          {getCartLength() === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-6">
              <div className="p-6 bg-gray-100 rounded-full dark:bg-white/5">
                <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
                Tu carrito está vacío
              </p>
              <Button
                variant="primary"
                onClick={() => navigate("/")}
                className="shadow-lg shadow-gold-500/20">
                Explorar Catálogo
              </Button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items List */}
              <div className="space-y-4 lg:col-span-2">
                {cart.map((producto) => (
                  <motion.div
                    key={producto.id + producto.name}
                    variants={itemVariants}>
                    <Card className="flex flex-col gap-4 items-center p-4 backdrop-blur-md transition-shadow duration-300 sm:flex-row bg-white/60 dark:bg-gray-900/60 hover:shadow-lg">
                      <div className="relative flex-shrink-0 w-full h-24 sm:w-24">
                        <img
                          src={producto.photo}
                          alt={producto.name}
                          className="object-cover w-full h-full rounded-lg shadow-sm"
                        />
                      </div>

                      <div className="flex-grow text-center sm:text-left">
                        <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white font-bodoni">
                          {producto.name}
                        </h2>
                        <div className="text-lg font-medium text-gold-600 dark:text-gold-400">
                          <Precio precio={producto.precio_unidad} />
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Disponibles:{" "}
                          {producto.cantUnidades - producto.cantidadCompra}
                        </p>
                      </div>

                      <div className="flex gap-3 items-center">
                        <div className="flex items-center p-1 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              reducirCantidad(producto, producto.cantidadCompra)
                            }
                            className="flex justify-center items-center w-8 h-8 text-gray-600 rounded-md transition-colors dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700">
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="w-8 font-medium text-center text-gray-900 dark:text-white">
                            {producto.cantidadCompra}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              aumentarCantidad(
                                producto,
                                producto.cantidadCompra,
                              )
                            }
                            disabled={
                              producto.cantidadCompra === producto.cantUnidades
                            }
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors ${
                              producto.cantidadCompra === producto.cantUnidades
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}>
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>

                        <Button
                          variant="ghost"
                          onClick={() => removeFromCart(producto)}
                          className="p-2 text-red-500 rounded-lg transition-colors hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <Card className="sticky top-24 p-6 border border-gray-200 shadow-xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 dark:border-gray-800">
                  <h2 className="pb-4 mb-6 text-2xl font-bold text-gray-900 border-b border-gray-100 dark:text-white font-bodoni dark:border-gray-800">
                    Resumen de Orden
                  </h2>

                  <div className="mb-6 space-y-4">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrecioParaTextarea(calcularSubtotal(), moneda)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Impuestos (16%)</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrecioParaTextarea(calcularImpuestos(), moneda)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Envío</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        Calculado al final
                      </span>
                    </div>
                    <div className="my-2 h-px bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span className="text-gold-600 dark:text-gold-400">
                        {formatPrecioParaTextarea(calcularTotal(), moneda)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      onClick={() => setIsOpen(true)}
                      className="justify-center py-4 w-full text-lg shadow-lg transition-shadow shadow-gold-500/20 hover:shadow-gold-500/30">
                      Finalizar Compra
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => vaciar()}
                      className="justify-center w-full text-gray-600 border-gray-200 dark:border-gray-700 dark:text-gray-400">
                      Vaciar Carrito
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-md bg-black/60">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide bg-white dark:bg-gray-950 rounded-3xl shadow-2xl border border-white/20">
              <div className="p-2 sm:p-6">
                <MultiStepForm />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 rounded-full transition-colors hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
