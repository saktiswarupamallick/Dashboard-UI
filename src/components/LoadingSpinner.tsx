import React from 'react';
import { THEME_CLASSES } from '../utils/theme';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '', 
  text 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} border-2 border-gray-200 dark:border-gray-700 rounded-full animate-spin`}
          style={{
            borderTopColor: '#3b82f6'
          }}
        />
      </div>
      {text && (
        <p className={`mt-2 text-sm ${THEME_CLASSES.TEXT_SECONDARY}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;


