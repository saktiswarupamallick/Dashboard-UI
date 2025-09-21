import React from 'react';
import { THEME_CLASSES } from '../utils/theme';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = React.memo(({ 
  className = '', 
  width = '100%', 
  height = '1rem',
  rounded = true,
  animate = true
}) => {
  return (
    <div
      className={`
        bg-gray-300 dark:bg-gray-700
        ${rounded ? 'rounded' : ''}
        ${animate ? 'animate-pulse' : ''}
        ${className}
      `}
      style={{ width, height }}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export const MetricCardSkeleton: React.FC = React.memo(() => (
  <div className="rounded-2xl p-6 bg-[#F7F9FB] dark:bg-[#FFFFFF0D]">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <Skeleton width="60%" height="1rem" className="mb-4" />
        <div className="flex items-center space-x-2">
          <Skeleton width="40%" height="2rem" />
          <Skeleton width="20%" height="1.5rem" />
        </div>
      </div>
    </div>
  </div>
));

export const ChartSkeleton: React.FC = React.memo(() => (
  <div className={`rounded-2xl p-6 ${THEME_CLASSES.CARD_BG}`}>
    <Skeleton width="50%" height="1.5rem" className="mb-4" />
    <Skeleton width="100%" height="200px" rounded={false} />
  </div>
));

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = React.memo(({ 
  rows = 5, 
  columns = 6 
}) => (
  <div className="w-full rounded-lg shadow-sm">
    <div className="p-4 sm:p-6">
      <Skeleton width="30%" height="1.5rem" className="mb-4" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
        <div className="flex items-center space-x-3">
          <Skeleton width="40px" height="40px" />
          <Skeleton width="40px" height="40px" />
          <Skeleton width="40px" height="40px" />
        </div>
        <Skeleton width="250px" height="40px" />
      </div>
    </div>

    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-4 sm:px-6 py-3 text-left">
                  <Skeleton width="80%" height="1rem" />
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 dark:border-gray-700">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 sm:px-6 py-4">
                    {colIndex === 1 ? (
                      <div className="flex items-center">
                        <Skeleton width="32px" height="32px" className="rounded-full mr-3" />
                        <Skeleton width="60%" height="1rem" />
                      </div>
                    ) : colIndex === columns - 1 ? (
                      <div className="flex items-center">
                        <Skeleton width="8px" height="8px" className="rounded-full mr-2" />
                        <Skeleton width="70%" height="1rem" />
                      </div>
                    ) : (
                      <Skeleton width="90%" height="1rem" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <Skeleton width="150px" height="1rem" />
        <div className="flex items-center space-x-2">
          <Skeleton width="40px" height="40px" />
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} width="32px" height="32px" />
          ))}
          <Skeleton width="40px" height="40px" />
        </div>
      </div>
    </div>
  </div>
));

export const SidebarSkeleton: React.FC = React.memo(() => (
  <div className={`w-54 h-full ${THEME_CLASSES.DASHBOARD_BG} border-r ${THEME_CLASSES.BORDER_DEFAULT} p-4`}>
    <div className="flex items-center space-x-3 mb-8">
      <Skeleton width="32px" height="32px" />
      <Skeleton width="80px" height="1.5rem" />
    </div>

    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <div key={sectionIndex}>
          <Skeleton width="60%" height="1rem" className="mb-3" />
          <div className="space-y-1">
            {Array.from({ length: 4 }).map((_, itemIndex) => (
              <div key={itemIndex} className="flex items-center space-x-3 p-2 rounded-lg">
                <Skeleton width="20px" height="20px" />
                <Skeleton width="70%" height="1rem" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
));

export const ActivitySidebarSkeleton: React.FC = React.memo(() => (
  <div className={`w-80 h-full ${THEME_CLASSES.DASHBOARD_BG} border-l ${THEME_CLASSES.BORDER_DEFAULT} p-4`}>
    <div className="mb-6">
      <Skeleton width="40%" height="1.5rem" className="mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg">
            <Skeleton width="32px" height="32px" />
            <div className="flex-1">
              <Skeleton width="80%" height="1rem" className="mb-2" />
              <Skeleton width="50%" height="0.75rem" />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-6">
      <Skeleton width="30%" height="1.5rem" className="mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg">
            <Skeleton width="32px" height="32px" className="rounded-full" />
            <div className="flex-1">
              <Skeleton width="90%" height="1rem" className="mb-2" />
              <Skeleton width="60%" height="0.75rem" />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <Skeleton width="25%" height="1.5rem" className="mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg">
            <Skeleton width="32px" height="32px" className="rounded-full" />
            <Skeleton width="70%" height="1rem" />
          </div>
        ))}
      </div>
    </div>
  </div>
));

export const HeaderSkeleton: React.FC = React.memo(() => (
  <header className={`${THEME_CLASSES.DASHBOARD_BG} border-b ${THEME_CLASSES.BORDER_DEFAULT} px-4 py-3`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Skeleton width="40px" height="40px" />
        <div className="hidden md:flex items-center space-x-2">
          <Skeleton width="80px" height="1rem" />
          <Skeleton width="20px" height="1rem" />
          <Skeleton width="60px" height="1rem" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Skeleton width="250px" height="40px" className="hidden md:block" />
        <Skeleton width="40px" height="40px" />
        <Skeleton width="40px" height="40px" />
        <Skeleton width="40px" height="40px" />
        <Skeleton width="40px" height="40px" />
      </div>
    </div>
  </header>
));

export default Skeleton;




