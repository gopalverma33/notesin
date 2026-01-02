'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Input = forwardRef(({ 
  className, 
  type = 'text',
  icon,
  error = false,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
          'placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
          'transition-all duration-200',
          icon && 'pl-10',
          error && 'border-error-500 focus:ring-error-500',
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;