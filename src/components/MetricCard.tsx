import React, { useMemo } from 'react';
import type { MetricCard as MetricCardType } from '../types';
import UpArrowIcon from './icons/UpArrowIcon';
import DownArrowIcon from './icons/DownArrowIcon';

interface MetricCardProps {
  metric: MetricCardType;
  className?: string;
  variant?: 'default' | 'blue' | 'light-blue' | 'light-gray' | 'light-purple';
}

const MetricCard: React.FC<MetricCardProps> = React.memo(({ metric, className = '', variant = 'default' }) => {
  const isPositive = metric.changeType === 'increase';
  
  const cardClasses = useMemo(() => {
    const baseClasses = 'hover:shadow-md transition-all duration-300 group rounded-2xl w-full';
    
    switch (variant) {
      case 'blue':
        return `${baseClasses} bg-blue-50 dark:bg-blue-900/20`;
      case 'light-blue':
        return `${baseClasses} bg-[#E3F5FF] dark:bg-[rgba(227,245,255,1)]`;
      case 'light-gray':
        return `${baseClasses} bg-[#F7F9FB] dark:bg-[#FFFFFF0D]`;
      case 'light-purple':
        return `${baseClasses} bg-[#E5ECF6] dark:bg-[rgba(227,245,255,1)]`;
      default:
        return baseClasses;
    }
  }, [variant]);
  
  return (
    <div className={`${cardClasses} ${className}`} style={{ padding: '16px' }}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3 ml-2 sm:mb-4">
            <h3 className={`text-sm font-medium ${
              variant === 'light-blue' || variant === 'light-purple' 
                ? 'text-gray-600 dark:text-black' 
                : 'text-gray-600 dark:text-white'
            }`}>
              {metric.title}
            </h3>
          </div>
          
          <div className={`flex flex-col sm:flex-row sm:items-center gap-2  px-2 sm:px-3 py-1 rounded-lg bg-transparent group-hover:flex-row-reverse transition-all duration-300 ${
            variant === 'light-blue' || variant === 'light-purple'
              ? 'group-hover:bg-gray-100 dark:group-hover:bg-blue-100'
              : 'group-hover:bg-gray-100 dark:group-hover:bg-zinc-800'
          }`}>
            <div className={`text-xl sm:text-2xl font-bold transition-all duration-300 ${
              variant === 'light-blue' || variant === 'light-purple' 
                ? 'text-gray-900 dark:text-black ' 
                : 'text-gray-900 dark:text-white '
            }`}>
              {metric.value}
            </div>
            
            <div className="flex items-center space-x-1">
              <span className={`text-sm font-medium ${
                variant === 'light-blue' || variant === 'light-purple' 
                  ? 'text-gray-900 dark:text-black' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {isPositive ? '+' : ''}{metric.change.toFixed(2)}%
              </span>
              {isPositive ? (
                <UpArrowIcon 
                  size={16} 
                  className={`${
                    variant === 'light-blue' || variant === 'light-purple' 
                      ? 'text-gray-900 dark:text-gray-700' 
                      : 'text-gray-900 dark:text-white'
                  }`}
                />
              ) : (
                <DownArrowIcon 
                  size={16} 
                  className={`${
                    variant === 'light-blue' || variant === 'light-purple' 
                      ? 'text-gray-900 dark:text-gray-600' 
                      : 'text-gray-900 dark:text-white'
                  }`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MetricCard;
