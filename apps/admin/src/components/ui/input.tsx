import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  showPasswordToggle = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode } = useTheme();
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className={`block text-sm font-semibold transition-colors ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {label}
          {required && <span className={`ml-1 ${
            isDarkMode ? 'text-red-400' : 'text-red-800'
          }`}>*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 border rounded-xl transition-all duration-200 outline-none focus:outline-none
            ${isDarkMode
              ? 'text-white placeholder-gray-400 bg-gray-700/50 hover:bg-gray-700/70'
              : 'text-gray-900 placeholder-gray-400 bg-stone-50 hover:bg-white'
            }
            ${error
              ? isDarkMode
                ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                : 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
              : isDarkMode
                ? 'border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                : 'border-stone-200 focus:ring-2 focus:ring-red-800 focus:border-transparent'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${(type === 'password' && showPasswordToggle) || error ? 'pr-12' : ''}
          `}
          {...props}
        />
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors p-1 rounded-lg outline-none focus:outline-none ${
              isDarkMode
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-600/50'
                : 'text-gray-400 hover:text-red-800 hover:bg-stone-100'
            }`}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {error && (
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            isDarkMode ? 'text-red-400' : 'text-red-500'
          }`}>
            <AlertCircle size={18} />
          </div>
        )}
      </div>
      {error && (
        <p className={`text-sm flex items-center gap-1 ${
          isDarkMode ? 'text-red-400' : 'text-red-600'
        }`}>
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;