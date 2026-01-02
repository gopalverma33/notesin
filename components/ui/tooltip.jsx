'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

const Tooltip = ({ 
  children, 
  content, 
  side = 'top',
  align = 'center',
  delayDuration = 700,
  className 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayDuration);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getTooltipPosition = () => {
    if (!triggerRef.current || !mounted) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect() || { width: 0, height: 0 };

    let top, left;

    switch (side) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8;
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + 8;
        break;
    }

    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          left = triggerRect.left;
          break;
        case 'center':
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'end':
          left = triggerRect.right - tooltipRect.width;
          break;
      }
    }

    return { top, left };
  };

  if (!mounted) {
    return (
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>

      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          className={cn(
            'absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md shadow-lg',
            'animate-fade-in pointer-events-none',
            className
          )}
          style={getTooltipPosition()}
          role="tooltip"
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;