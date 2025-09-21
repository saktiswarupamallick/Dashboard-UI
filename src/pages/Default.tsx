import React, { useState, useEffect, useMemo } from 'react';
import OrderTable from '../components/OrderTable';
import { TableSkeleton } from '../components/SkeletonLoader';
import { useApp } from '../contexts/AppContext';
import { THEME_CLASSES } from '../utils/theme';

const Default: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const filteredOrders = useMemo(() => {
    if (!state.searchQuery) {
      return state.orders;
    }

    return state.orders.filter(order =>
      order.orderId.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      order.user.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      order.project.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.orders, state.searchQuery]);

  return (
    <div className={`min-h-screen ${THEME_CLASSES.DASHBOARD_BG}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <div className="animate-slide-up">
          {isLoading ? (
            <TableSkeleton rows={10} columns={7} />
          ) : (
            <OrderTable orders={filteredOrders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Default;


