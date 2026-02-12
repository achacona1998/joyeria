import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../../../components/ui/Button";

export const Text = () => {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-2 block">
          Colección Exclusiva 2026
        </span>
        <h1 className="text-6xl Laptop:text-8xl font-serif text-dark-800 dark:text-white leading-tight">
          Silena <br />
          <span className="italic text-gold-400">Joyería</span>
        </h1>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg Laptop:text-xl text-dark-600 dark:text-light-200 leading-relaxed border-l-2 border-gold-300 pl-6"
      >
        Descubre el arte de la elegancia atemporal. Desde anillos sofisticados hasta collares que capturan la luz, cada pieza es una obra maestra diseñada para resaltar tu belleza única.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex gap-4 pt-4"
      >
        <Link to="/Catalogos">
          <Button variant="primary" size="lg" className="shadow-glow">
            Ver Colección
          </Button>
        </Link>
        <Link to="/Brazaletes">
           <Button variant="secondary" size="lg">
            Novedades
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
