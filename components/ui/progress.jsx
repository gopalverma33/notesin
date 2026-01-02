'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Progress = forwardRef(({ 
  className, 
  value = 0, 
  max = 100,
  showValue = false,
  label,
  color = 'primary',
  size = 'default',
  ...props 
}, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600',
  };

  const sizes = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-gray-600">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-gray-200',
          sizes[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full w-full flex-1 transition-all duration-300 ease-in-out',
            colors[color]
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    </div>
  );
});

Progress.displayName = 'Progress';

export default Progress;