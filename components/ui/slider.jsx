'use client';

import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Slider = forwardRef(({ 
  className,
  min = 0,
  max = 100,
  step = 1,
  value = [50],
  onValueChange,
  disabled = false,
  label,
  showValue = true,
  ...props 
}, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const currentValue = Array.isArray(value) ? value[0] : value;

  const updateValue = (clientX) => {
    if (!sliderRef.current || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newValue = Math.round((min + percentage * (max - min)) / step) * step;
    
    onValueChange?.([Math.max(min, Math.min(max, newValue))]);
  };

  const handleMouseDown = (event) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      updateValue(event.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {showValue && (
            <span className="text-sm text-gray-600">
              {currentValue}
            </span>
          )}
        </div>
      )}
      
      <div
        ref={sliderRef}
        className={cn(
          'relative flex w-full touch-none select-none items-center cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        onMouseDown={handleMouseDown}
        {...props}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
          <div 
            className="absolute h-full bg-primary-600 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div
          className={cn(
            'absolute block h-5 w-5 rounded-full border-2 border-primary-600 bg-white shadow-lg',
            'transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            'hover:scale-110',
            disabled && 'cursor-not-allowed'
          )}
          style={{ left: `calc(${percentage}% - 10px)` }}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
        />
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;