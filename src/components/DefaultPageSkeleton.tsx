import React from 'react';
import { TableSkeleton } from './SkeletonLoader';
import { THEME_CLASSES } from '../utils/theme';

const DefaultPageSkeleton: React.FC = React.memo(() => {
  return (
    <div className={`w-full min-h-screen ${THEME_CLASSES.DASHBOARD_BG}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <div className="animate-slide-up">
          <TableSkeleton rows={10} columns={7} />
        </div>
      </div>
    </div>
  );
});

DefaultPageSkeleton.displayName = 'DefaultPageSkeleton';

export default DefaultPageSkeleton;






