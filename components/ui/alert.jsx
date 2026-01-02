'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Alert = forwardRef(({ className, variant = 'default', children, ...props }, ref) => {
  const variants = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-success-50 border-success-200 text-success-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    error: 'bg-error-50 border-error-200 text-error-800',
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Alert.displayName = 'Alert';

const AlertDescription = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm leading-relaxed', className)}
    {...props}
  >
    {children}
  </div>
));

AlertDescription.displayName = 'AlertDescription';

export default Alert;
export { AlertDescription };