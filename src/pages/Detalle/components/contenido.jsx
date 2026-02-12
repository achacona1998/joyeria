import { useNavigate, useParams } from "react-router-dom";
import useGetJoya from "../../../hooks/GET2";
import { useContext } from "react";
import { CartContext } from "../../../context/contexto";
import { Precio } from "../../../utils/precioUtils";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { motion } from "framer-motion";

export const Contenido = () => {
  const { handleAddCart } = useContext(CartContext);
  const { categoria, id } = useParams();
  const { elemento, loading, error } = useGetJoya(categoria, id);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20 bg-light-50 dark:bg-dark-900">
        <div className="flex gap-4">
          <div className="w-4 h-4 bg-gold-400 rounded-full animate-bounce [animation-delay:.1s]"></div>
          <div className="w-4 h-4 bg-gold-400 rounded-full animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 bg-gold-400 rounded-full animate-bounce [animation-delay:.5s]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-light-50 dark:bg-dark-900 text-dark-800 dark:text-white text-center">
        <p className="text-2xl font-serif mb-4">
          Error al cargar los detalles del producto.
        </p>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-light-50 dark:bg-dark-900 transition-colors duration-300">
      <div className="wrapper">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 pl-0 hover:bg-transparent hover:text-gold-500"
        >
          &larr; Volver al catálogo
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-white dark:bg-dark-800 shadow-glass">
              <img
                src={elemento.photo}
                alt={elemento.name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  elemento.cantUnidades == 0 ? "grayscale opacity-50" : ""
                }`}
              />
              {elemento.cantUnidades == 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <span className="bg-red-500 text-white px-8 py-2 text-2xl font-bold tracking-widest transform -rotate-12 shadow-2xl border-4 border-white">
                    AGOTADO
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                {categoria}
              </span>
              <h1 className="text-4xl lg:text-5xl font-serif text-dark-800 dark:text-white mb-4">
                {elemento.name}
              </h1>
              <div className="text-3xl font-bold text-dark-900 dark:text-gold-300">
                <Precio key={elemento.id} precio={elemento.precio_unidad} />
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-white/10 w-full"></div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm md:text-base">
              <div className="flex flex-col gap-1">
                <span className="text-dark-500 dark:text-light-200/60 uppercase text-xs tracking-wider">Pureza</span>
                <span className="font-medium text-dark-800 dark:text-white">{elemento.pureza}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-dark-500 dark:text-light-200/60 uppercase text-xs tracking-wider">Peso Neto</span>
                <span className="font-medium text-dark-800 dark:text-white">{elemento.peso_neto} g</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-dark-500 dark:text-light-200/60 uppercase text-xs tracking-wider">Tamaño</span>
                <span className="font-medium text-dark-800 dark:text-white">{elemento.size || "Estándar"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-dark-500 dark:text-light-200/60 uppercase text-xs tracking-wider">Género</span>
                <span className="font-medium text-dark-800 dark:text-white">{elemento.genero_usuario}</span>
              </div>

              {/* Conditional Info */}
              {categoria === "anillo" && (
                <>
                  <div className="flex flex-col gap-1">
                    <span className="text-dark-500 dark:text-light-200/60 uppercase text-xs tracking-wider">Tipo</span>
                    <span className="font-medium text-dark-800 dark:text-white">{elemento.tipo_anillo}</span>
                  </div>
                </>
              )}
              {categoria === "dije" && (
                <div className="flex flex-col gap-1">
                  <span className="text-dark-500 dark:text-light-200/60 uppercase text-xs tracking-wider">Estilo</span>
                  <span className="font-medium text-dark-800 dark:text-white">{elemento.tipo_dije}</span>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <Button
                disabled={elemento.cantUnidades == 0}
                onClick={() => handleAddCart(elemento, categoria)}
                className={`w-full py-4 text-lg shadow-glow ${
                  elemento.cantUnidades == 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {elemento.cantUnidades == 0 ? "No disponible" : "Añadir al Carrito"}
              </Button>
              
              <p className="text-xs text-center text-dark-500 dark:text-light-200/50 mt-2">
                Envío seguro y asegurado • Garantía de autenticidad
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
