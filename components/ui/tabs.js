'use client';

import { useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

const TabsContext = createContext();

const Tabs = ({ defaultValue, onValueChange, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ className, children }) => {
  const context = useContext(TabsContext);
  
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1',
        className
      )}
      role="tablist"
    >
      {typeof children === 'function' ? children(context) : children}
    </div>
  );
};

const TabsTrigger = ({ value, children, className, activeTab, setActiveTab }) => {
  const context = useContext(TabsContext);
  const currentActiveTab = activeTab || context?.activeTab;
  const currentSetActiveTab = setActiveTab || context?.setActiveTab;
  
  const isActive = currentActiveTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => currentSetActiveTab?.(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium',
        'transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        isActive 
          ? 'bg-white text-gray-900 shadow-sm' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50',
        className
      )}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className, activeTab }) => {
  const context = useContext(TabsContext);
  const currentActiveTab = activeTab || context?.activeTab;
  
  if (currentActiveTab !== value) return null;

  return (
    <div
      className={cn('mt-2 ring-offset-background focus:outline-none', className)}
      role="tabpanel"
    >
      {children}
    </div>
  );
};

export default Tabs;
export { TabsList, TabsTrigger, TabsContent };