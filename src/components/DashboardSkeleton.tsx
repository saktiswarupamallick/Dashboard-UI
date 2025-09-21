import React from 'react';
import { 
  MetricCardSkeleton, 
  ChartSkeleton, 
  TableSkeleton 
} from './SkeletonLoader';
import { THEME_CLASSES } from '../utils/theme';


const DashboardSkeleton: React.FC = React.memo(() => {
  return (
    <div className={`p-6 space-y-6 animate-fade-in ${THEME_CLASSES.DASHBOARD_BG} min-h-screen`}>

      <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="grid grid-cols-2 gap-6 gap-y-4">
          <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
            <MetricCardSkeleton />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <MetricCardSkeleton />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <MetricCardSkeleton />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <MetricCardSkeleton />
          </div>
        </div>

       
        <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <ChartSkeleton />
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 animate-slide-up h-full" style={{ animationDelay: '600ms' }}>
          <ChartSkeleton />
        </div>
        <div className="lg:col-span-1 animate-slide-up h-full" style={{ animationDelay: '700ms' }}>
          <ChartSkeleton />
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 animate-slide-up h-full" style={{ animationDelay: '800ms' }}>
          <TableSkeleton rows={5} columns={4} />
        </div>
        <div className="lg:col-span-1 animate-slide-up h-full" style={{ animationDelay: '900ms' }}>
          <ChartSkeleton />
        </div>
      </div>
    </div>
  );
});

DashboardSkeleton.displayName = 'DashboardSkeleton';

export default DashboardSkeleton;


