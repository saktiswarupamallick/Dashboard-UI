import React, { useState, useEffect } from 'react';
import MetricCard from '../components/MetricCard';
import BarChart from '../components/BarChart';
import RevenueChart from '../components/RevenueChart';
import WorldMap from '../components/WorldMap';
import ProductTable from '../components/ProductTable';
import DonutChart from '../components/DonutChart';
import { 
  MetricCardSkeleton, 
  ChartSkeleton, 
  TableSkeleton 
} from '../components/SkeletonLoader';
import { THEME_CLASSES } from '../utils/theme';
import { useApp } from '../contexts/AppContext';

const Dashboard: React.FC = () => {
  const { state } = useApp();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`p-6 space-y-6 animate-fade-in ${THEME_CLASSES.DASHBOARD_BG} min-h-screen`}>
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
  }

  return (
    <div className={`p-6 space-y-6 animate-fade-in ${THEME_CLASSES.DASHBOARD_BG} min-h-screen`}>
      <h1 className="text-gray-900 dark:text-white text-secondary font-medium ">eCommerce</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-6 gap-y-4">
          <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
            <MetricCard metric={state.metricCards[0]} variant="light-blue" />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <MetricCard metric={state.metricCards[1]} variant="light-gray" />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <MetricCard metric={state.metricCards[2]} variant="light-gray" />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <MetricCard metric={state.metricCards[3]} variant="light-purple" />
          </div>
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <BarChart
            data={state.projectionsData}
            actualData={state.actualsData}
            title="Projections vs Actuals"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 animate-slide-up h-full" style={{ animationDelay: '600ms' }}>
          <RevenueChart data={state.revenueData} />
        </div>
        <div className="lg:col-span-1 animate-slide-up h-full" style={{ animationDelay: '700ms' }}>
          <WorldMap data={state.locationData} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 animate-slide-up h-full" style={{ animationDelay: '800ms' }}>
          <ProductTable products={state.products} />
        </div>
        <div className="lg:col-span-1 animate-slide-up h-full" style={{ animationDelay: '900ms' }}>
          <DonutChart data={state.salesData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
