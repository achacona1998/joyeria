import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Checkbox = ({ label, checked, onChange, className = "" }) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      <div className="relative flex items-center justify-center w-5 h-5">
        <input
          type="checkbox"
          className="peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-md checked:bg-primary-500 checked:border-primary-500 transition-colors duration-200 cursor-pointer"
          checked={checked}
          onChange={onChange}
        />
        <motion.svg
          initial={false}
          animate={checked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute w-3.5 h-3.5 text-white pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </motion.svg>
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {label}
      </span>
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Checkbox;
