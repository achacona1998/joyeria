import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";

export const Error = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const irAtras = () => {
    navigate(from);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center px-4 w-full max-w-2xl text-center">
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
            className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br opacity-20 select-none font-bodoni from-gold-400 to-gold-600 dark:from-gold-300 dark:to-gold-500">
            404
          </motion.div>
          <div className="flex absolute inset-0 justify-center items-center">
            <h1 className="text-4xl font-bold tracking-widest text-gray-900 uppercase backdrop-blur-sm md:text-6xl dark:text-white font-bodoni">
              Página no encontrada
            </h1>
          </div>
        </div>

        <p className="mb-10 max-w-lg text-lg text-gray-600 md:text-xl dark:text-gray-400">
          Lo sentimos, no pudimos encontrar la página que estás buscando. Puede
          que haya sido movida o eliminada.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            variant="primary"
            onClick={() => irAtras()}
            className="justify-center px-8 py-3">
            Volver Atrás
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="justify-center px-8 py-3">
            Ir al Inicio
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
