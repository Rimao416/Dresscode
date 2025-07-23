import React, { forwardRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
  const { isDarkMode } = useTheme();

  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 outline-none focus:outline-none';
 
  const getVariantClasses = (variant: ButtonVariant) => {
    const variants = {
      primary: isDarkMode
        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
        : 'bg-gradient-to-r from-red-800 to-red-700 text-white hover:from-red-900 hover:to-red-800 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
        
      secondary: isDarkMode
        ? 'border border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 hover:border-gray-500 hover:shadow-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800'
        : 'border border-stone-200 bg-white text-gray-700 hover:bg-stone-50 hover:border-stone-300 hover:shadow-md focus:ring-2 focus:ring-gray-300 focus:ring-offset-2',
        
      outline: isDarkMode
        ? 'border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
        : 'border border-red-800 text-red-800 hover:bg-red-800 hover:text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
        
      ghost: isDarkMode
        ? 'text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
        : 'text-red-800 hover:bg-red-50 focus:ring-2 focus:ring-red-300 focus:ring-offset-2',
        
      danger: isDarkMode
        ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800'
        : 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
    };
    
    return variants[variant];
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg'
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${getVariantClasses(variant)}
        ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
          variant === 'primary' || variant === 'danger' 
            ? 'border-white' 
            : isDarkMode 
              ? 'border-blue-400' 
              : 'border-red-800'
        }`}></div>
      )}
      {leftIcon && !loading && leftIcon}
      {children}
      {rightIcon && !loading && rightIcon}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;