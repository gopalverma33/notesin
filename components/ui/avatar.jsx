'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

const Avatar = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));

Avatar.displayName = 'Avatar';

const AvatarImage = forwardRef(({ className, src, alt, ...props }, ref) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return null;
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn('aspect-square h-full w-full object-cover', className)}
      onError={() => setHasError(true)}
      {...props}
    />
  );
});

AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

AvatarFallback.displayName = 'AvatarFallback';

export default Avatar;
export { AvatarImage, AvatarFallback };