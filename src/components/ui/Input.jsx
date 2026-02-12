import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  className = "",
  icon,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 text-gray-400 -translate-y-1/2 pointer-events-none">
            {icon}
          </div>
        )}
        <motion.input
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full py-3 rounded-xl outline-none transition-all duration-300
            bg-white/50 dark:bg-black/40 backdrop-blur-sm
            border border-gray-200 dark:border-white/10
            text-gray-900 dark:text-white placeholder-gray-400
            focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? "pr-4 pl-10" : "px-4"}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
          {...props}
        />
      </div>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-1 text-xs text-red-500">
          {error}
        </motion.span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
