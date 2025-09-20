import React from 'react';
import OrderTable from '../components/OrderTable';
import { ordersData } from '../utils/data';
import { THEME_CLASSES } from '../utils/theme';

const Default: React.FC = () => {
  return (
    <div className={`w-full min-h-screen ${THEME_CLASSES.DASHBOARD_BG}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <div className="animate-slide-up">
          <OrderTable orders={ordersData} />
        </div>
      </div>
    </div>
  );
};

export default Default;


