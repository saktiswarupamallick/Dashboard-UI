import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { SalesData } from '../types';
import { formatCurrency } from '../utils';
import { THEME_CLASSES, getTooltipStyles } from '../utils/theme';
import { useTheme } from '../contexts/ThemeContext';

interface DonutChartProps {
  data: SalesData;
  className?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, className = '' }) => {
  const { isDark } = useTheme();
  const tooltipStyles = getTooltipStyles(isDark);
  
  const chartData = [
    {
      name: 'Direct',
      value: data.direct,
      color: isDark ? 'rgba(149, 164, 252, 1)' : '#111827'
    },
    {
      name: 'Affiliate',
      value: data.affiliate,
      color: '#86efac'
    },
    {
      name: 'Sponsored',
      value: data.sponsored,
      color: '#c084fc'
    },
    {
      name: 'E-mail',
      value: data.email,
      color: '#93c5fd'
    }
  ];


  return (
    <div className={`h-full flex ${THEME_CLASSES.CARD_BG} rounded-2xl flex-col p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 text-secondary dark:text-white">Total Sales</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div style={{ height: '170px', width: '170px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                cornerRadius={14}
                startAngle={90}
                endAngle={450}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={tooltipStyles}
                formatter={(value: number, name: string) => [formatCurrency(value), name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 w-full space-y-3">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className={`text-sm font-medium ${THEME_CLASSES.TEXT_PRIMARY}`}>
                  {item.name}
                </span>
              </div>
              <span className={`text-sm font-semibold ${THEME_CLASSES.TEXT_PRIMARY}`}>
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
