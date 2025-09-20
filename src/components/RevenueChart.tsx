import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    name: item.date === 'Current Week' ? 'Current' : item.date,
    current: item.current,
    previous: item.previous
  }));

  const currentWeek = data[0];


  return (
    <div className={`h-full flex flex-col p-6 ${THEME_CLASSES.CARD_BG} rounded-2xl ${className}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-semibold ${THEME_CLASSES.TEXT_PRIMARY}`}>Revenue</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-0.5 ${THEME_CLASSES.TEXT_PRIMARY} rounded`}></div>
              <span className={`text-sm ${THEME_CLASSES.TEXT_SECONDARY}`}>Current Week {formatCurrency(currentWeek.current)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-blue-300 rounded"></div>
              <span className={`text-sm ${THEME_CLASSES.TEXT_SECONDARY}`}>Previous Week {formatCurrency(currentWeek.previous)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: chartColors.text }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: chartColors.text }}
              tickFormatter={(value) => formatChartValue(value)}
            />
            <Tooltip 
              contentStyle={tooltipStyles}
              formatter={(value: number, name: string) => {
                const formattedValue = formatChartValue(value);
                return [formattedValue, name === 'current' ? 'Current Week' : 'Previous Week'];
              }}
            />
            <Line 
              type="monotone" 
              dataKey="previous" 
              stroke={chartColors.primary} 
              strokeWidth={2}
              dot={{ fill: chartColors.primary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke={chartColors.secondary} 
              strokeWidth={3}
              dot={{ fill: chartColors.secondary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
