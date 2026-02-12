import PropTypes from "prop-types";
import { motion } from "framer-motion";

export const TarjetaAnimada = ({ Color, Data, expe }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative w-full max-w-sm aspect-[1.586/1] rounded-2xl p-6 
        shadow-2xl backdrop-blur-xl border border-white/20
        flex flex-col justify-between overflow-hidden
        ${Color.container || "bg-gradient-to-br from-gray-900 to-black text-white"}
      `}
    >
      {/* Glass shine effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      {/* Chip and Contactless */}
      <div className="flex justify-between items-start relative z-10">
        <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 border border-yellow-600/50 flex items-center justify-center overflow-hidden">
          <div className="w-full h-[1px] bg-yellow-600/30 absolute top-1/3"></div>
          <div className="w-full h-[1px] bg-yellow-600/30 absolute bottom-1/3"></div>
          <div className="h-full w-[1px] bg-yellow-600/30 absolute left-1/3"></div>
          <div className="h-full w-[1px] bg-yellow-600/30 absolute right-1/3"></div>
        </div>
        <svg className="w-8 h-8 opacity-80" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="none"/>
           <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6 6 6z" opacity=".3"/>
           <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
      </div>

      {/* Card Number */}
      <div className={`text-2xl tracking-widest font-mono relative z-10 mt-4 ${Color.numbers || "text-white"}`}>
        {Data.tarjeta
          ? Data.tarjeta
              .replace(/\D/g, "")
              .replace(/(.{4})/g, "$1 ")
              .trim()
              .slice(0, 19)
          : "XXXX XXXX XXXX XXXX"}
      </div>

      {/* Card Holder and Expiry */}
      <div className="flex justify-between items-end relative z-10 mt-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase opacity-70 tracking-wider mb-1">Titular</span>
          <span className="text-sm font-medium tracking-wide uppercase truncate max-w-[180px]">
            {Data.nombre || Data.apellidos 
              ? `${Data.nombre || ""} ${Data.apellidos || ""}`
              : "NOMBRE APELLIDO"}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase opacity-70 tracking-wider mb-1">Expira</span>
          <span className="text-sm font-medium tracking-wide font-mono">
            {expe
              ? expe
                  .replace(/\D/g, "")
                  .replace(/(.{2})/, "$1/")
                  .slice(0, 5)
              : "MM/YY"}
          </span>
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
    </motion.div>
  );
};

TarjetaAnimada.propTypes = {
  Color: PropTypes.shape({
    container: PropTypes.string,
    numbers: PropTypes.string
  }),
  Data: PropTypes.shape({
    tarjeta: PropTypes.string,
    nombre: PropTypes.string,
    apellidos: PropTypes.string
  }),
  expe: PropTypes.string
};
