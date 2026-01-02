'use client';

import { forwardRef, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

const RadioGroupContext = createContext();

const RadioGroup = forwardRef(({ 
  className, 
  value,
  onValueChange,
  disabled = false,
  children,
  ...props 
}, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, disabled }}>
      <div
        ref={ref}
        className={cn('grid gap-2', className)}
        role="radiogroup"
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = forwardRef(({ 
  className, 
  value,
  disabled: itemDisabled = false,
  children,
  ...props 
}, ref) => {
  const context = useContext(RadioGroupContext);
  const isChecked = context?.value === value;
  const isDisabled = context?.disabled || itemDisabled;

  const handleChange = () => {
    if (!isDisabled && context?.onValueChange) {
      context.onValueChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isChecked}
        onClick={handleChange}
        disabled={isDisabled}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-gray-300 text-primary-600',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isChecked && 'border-primary-600',
          className
        )}
        {...props}
      >
        {isChecked && (
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary-600" />
          </div>
        )}
      </button>
      {children && (
        <label 
          className={cn(
            'text-sm font-medium leading-none cursor-pointer',
            isDisabled ? 'text-gray-400' : 'text-gray-900'
          )}
          onClick={handleChange}
        >
          {children}
        </label>
      )}
    </div>
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';

export default RadioGroup;
export { RadioGroupItem };