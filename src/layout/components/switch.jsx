import useTheme from "../../hooks/useTheme";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-xl transition-all duration-300
        ${
          isDark
            ? "bg-white/10 text-gold-400 hover:bg-white/20"
            : "bg-gray-100 text-gold-600 hover:bg-gray-200"
        }
      `}
      aria-label="Toggle theme">
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="flex absolute inset-0 justify-center items-center">
          <Sun className="w-5 h-5" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
          }}
          transition={{ duration: 0.2 }}
          className="flex absolute inset-0 justify-center items-center">
          <Moon className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.button>
  );
}
