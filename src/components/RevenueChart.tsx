import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { RevenueData } from '../types';
import { formatCurrency } from '../utils';
import { THEME_CLASSES, getChartColors, getTooltipStyles, formatChartValue } from '../utils/theme';
import { useTheme } from '../contexts/ThemeContext';

interface RevenueChartProps {
  data: RevenueData[];
  className?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, className = '' }) => {
  const { isDark } = useTheme();
  const chartColors = getChartColors(isDark);
  const tooltipStyles = getTooltipStyles(isDark);
  
  if (!data.length) return null;

  const chartData = data.map(item => ({
    name: item.date,
    current: item.current,
    previous: item.previous
  }));

 


  return (
    <div className={`h-full flex flex-col p-4 sm:p-6 ${THEME_CLASSES.CARD_BG} rounded-2xl ${className}`}>
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center  gap-2 sm:gap-4 mb-2">
          <h3 className="text-gray-900 text-secondary dark:text-white">Revenue</h3>
          
          <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-[rgba(198,199,248,1)]' : 'bg-gray-900'}`}></div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Current Week {formatCurrency(58211)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-300"></div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Previous Week {formatCurrency(58768)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[200px] sm:min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? 'rgba(198,199,248,0.4)' : 'rgba(59, 130, 246, 0.4)'} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={isDark ? 'rgba(198,199,248,0.1)' : 'rgba(59, 130, 246, 0.1)'} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: chartColors.text }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: chartColors.text }}
              tickFormatter={(value) => formatChartValue(value)}
            />
            <Tooltip 
              contentStyle={tooltipStyles}
              formatter={(value: number, name: string) => {
                const formattedValue = formatChartValue(value);
                return [formattedValue, name === 'current' ? 'Current Week' : 'Previous Week'];
              }}
            />
            <Area
              type="monotone"
              dataKey="current"
              stroke={isDark ? 'rgba(198,199,248,1)' : chartColors.secondary}
              strokeWidth={3}
              fill="url(#currentGradient)"
              dot={{ fill: isDark ? 'rgba(198,199,248,1)' : chartColors.secondary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="previous" 
              stroke={chartColors.primary} 
              strokeWidth={2}
              dot={{ fill: chartColors.primary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
