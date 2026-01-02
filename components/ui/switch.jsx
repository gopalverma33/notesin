'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Switch = forwardRef(({ 
  className, 
  checked = false,
  onCheckedChange,
  disabled = false,
  label,
  description,
  ...props 
}, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        disabled={disabled}
        className={cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-primary-600' : 'bg-gray-200',
          className
        )}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
      
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label className={cn(
              'text-sm font-medium leading-none cursor-pointer',
              disabled ? 'text-gray-400' : 'text-gray-900'
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

Switch.displayName = 'Switch';

export default Switch;