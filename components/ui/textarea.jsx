'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Textarea = forwardRef(({ 
  className, 
  error = false,
  label,
  helperText,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
          'placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-none',
          error && 'border-error-500 focus:ring-error-500',
          className
        )}
        ref={ref}
        {...props}
      />
      {helperText && (
        <p className={cn(
          'mt-1 text-sm',
          error ? 'text-error-600' : 'text-gray-600'
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;