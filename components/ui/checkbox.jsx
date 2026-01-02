'use client';

import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  disabled = false,
  label,
  description,
  error = false,
  ...props 
}, ref) => {
  return (
    <div className="flex items-start space-x-2">
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            'flex h-4 w-4 items-center justify-center rounded border-2 transition-all',
            'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
            checked 
              ? 'bg-primary-600 border-primary-600 text-white' 
              : 'border-gray-300 bg-white hover:border-gray-400',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'border-error-500',
            className
          )}
          onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
        >
          {checked && <Check className="h-3 w-3" />}
        </div>
      </div>
      
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label className={cn(
              'text-sm font-medium leading-none cursor-pointer',
              disabled ? 'text-gray-400' : 'text-gray-900',
              error && 'text-error-600'
            )}>
              {label}
            </label>
          )}
          {description && (
            <p className={cn(
              'text-sm',
              disabled ? 'text-gray-400' : 'text-gray-600'
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;