import React from 'react';

import type { MetricCard as MetricCardType } from '../types';
import upArrowMetrics from "../assets/upArrowMetrics.png";
import downArrowMetrics from "../assets/downArrowMetrics.png";

interface MetricCardProps {
  metric: MetricCardType;
  className?: string;
  variant?: 'default' | 'blue' | 'light-blue' | 'light-gray' | 'light-purple';
}



const MetricCard: React.FC<MetricCardProps> = ({ metric, className = '', variant = 'default' }) => {

  const isPositive = metric.changeType === 'increase';
  
  const getCardClasses = () => {
    const baseClasses = 'hover:shadow-md transition-all duration-300 group rounded-2xl';
    
    switch (variant) {
      case 'blue':
        return `${baseClasses} bg-blue-50 dark:bg-blue-900/20`;
      case 'light-blue':
        return `${baseClasses} bg-[#E3F5FF] dark:bg-blue-900/20`;
      case 'light-gray':
        return `${baseClasses} bg-[#F7F9FB] dark:bg-gray-800/20`;
      case 'light-purple':
        return `${baseClasses} bg-[#E5ECF6] dark:bg-purple-900/20`;
      default:
        return baseClasses;
    }
  };
  
  return (
    <div className={`${getCardClasses()} ${className}`} style={{ padding: '24px' }}>
      <div className="flex items-start justify-between ">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
           
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {metric.title}
            </h3>
          </div>
          
          <div className=" flex  space-y-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {metric.value}
            </div>
            
            <div className="flex  space-x-1 ml-2 items-center ">
             
              <span className={`text-sm font-medium `}
                >
                {isPositive ? '+' : ''}{metric.change.toFixed(2)}%
              </span>
              {isPositive ? (
                <img src={upArrowMetrics} alt="up arrow" />
              ) : (
                <img src={downArrowMetrics} alt="down arrow" />
              )}
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default MetricCard;
