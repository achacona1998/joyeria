import { useContext, useState, useRef, useEffect } from "react";
import { MonedaContext } from "../../context/contexto";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Coins } from "lucide-react";

export default function Moneda() {
  const { moneda, setMoneda } = useContext(MonedaContext);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currencies = [
    { value: "cup", label: "CUP" },
    { value: "usd", label: "USD" },
    { value: "mlc", label: "MLC" },
  ];

  const handleSelect = (value) => {
    setMoneda(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300
          ${
            isOpen
              ? "bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400"
              : "text-gray-700 hover:bg-gray-100 dark:hover:bg-white/10 dark:text-gray-200"
          }
        `}>
        <Coins className="w-4 h-4" />
        <span className="text-sm font-medium uppercase font-bodoni">
          {moneda}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 opacity-70" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden absolute right-0 z-50 mt-2 w-32 rounded-xl border border-gray-100 shadow-xl backdrop-blur-xl origin-top-right bg-white/90 dark:bg-gray-900/90 dark:border-white/10">
            <div className="p-1">
              {currencies.map((curr) => (
                <button
                  key={curr.value}
                  onClick={() => handleSelect(curr.value)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors
                    ${
                      moneda === curr.value
                        ? "bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                    }
                  `}>
                  <span className="font-bodoni">{curr.label}</span>
                  {moneda === curr.value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
