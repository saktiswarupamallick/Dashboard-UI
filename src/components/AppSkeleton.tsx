import React from 'react';
import { 
  SidebarSkeleton, 
  HeaderSkeleton, 
  ActivitySidebarSkeleton 
} from './SkeletonLoader';
import { THEME_CLASSES } from '../utils/theme';

const AppSkeleton: React.FC = React.memo(() => {
  return (
    <div className={`h-screen ${THEME_CLASSES.DASHBOARD_BG} transition-colors duration-300`}>
      <div className="flex h-full">
        <SidebarSkeleton />
        
        <div className="flex-1 flex flex-col h-full">
          <HeaderSkeleton />
          
          <main className="flex-1 transition-all duration-300 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-6 gap-y-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="rounded-2xl p-6 bg-gray-100 dark:bg-gray-800 animate-pulse">
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                      <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl p-6 bg-gray-100 dark:bg-gray-800 animate-pulse">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                  <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          </main>
        </div>

        <ActivitySidebarSkeleton />
      </div>
    </div>
  );
});

AppSkeleton.displayName = 'AppSkeleton';

export default AppSkeleton;






