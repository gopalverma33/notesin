'use client';

import { cn } from '@/lib/utils';

const LoadingSpinner = ({ size = 'default', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'border-2 border-current border-t-transparent rounded-full animate-spin',
          sizes[size]
        )}
      />
    </div>
  );
};

const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" className="text-primary-600 mb-4" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

const InlineLoader = ({ message = 'Loading...', className }) => {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <div className="text-center">
        <LoadingSpinner className="text-primary-600 mb-2" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
export { PageLoader, InlineLoader };