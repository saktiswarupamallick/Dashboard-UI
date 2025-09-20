import React from 'react';
import MetricCard from './MetricCard';
import BarChart from './BarChart';
import RevenueChart from './RevenueChart';
import WorldMap from './WorldMap';
import ProductTable from './ProductTable';
import DonutChart from './DonutChart';
import { THEME_CLASSES } from '../utils/theme';
import { 
  metricCards, 
  projectionsData, 
  actualsData, 
  revenueData, 
  locationData, 
  topProducts, 
  salesData 
} from '../utils/data';

const Dashboard: React.FC = () => {
  return (
    <div className={`p-6 space-y-6 animate-fade-in ${THEME_CLASSES.DASHBOARD_BG} min-h-screen`}>
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-6 gap-y-4">
          <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
            <MetricCard metric={metricCards[0]} variant="light-blue" />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <MetricCard metric={metricCards[1]} variant="light-gray" />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <MetricCard metric={metricCards[2]} variant="light-gray" />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <MetricCard metric={metricCards[3]} variant="light-purple" />
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <BarChart
            data={projectionsData}
            actualData={actualsData}
            title="Projections vs Actuals"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-96">
        <div className="lg:col-span-3 animate-slide-up h-full" style={{ animationDelay: '600ms' }}>
          <RevenueChart data={revenueData} />
        </div>
        <div className="lg:col-span-1 animate-slide-up h-full" style={{ animationDelay: '700ms' }}>
          <WorldMap data={locationData} />
        </div>
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-4 gap-6 h-96">
        <div className="lg:col-span-3 animate-slide-up h-full" style={{ animationDelay: '800ms' }}>
          <ProductTable products={topProducts} />
        </div>
        <div className="lg:col-span-1 animate-slide-up h-full" style={{ animationDelay: '900ms' }}>
          <DonutChart data={salesData} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
