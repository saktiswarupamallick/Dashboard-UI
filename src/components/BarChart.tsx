import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../types';
import { THEME_CLASSES, getChartColors, formatChartValue } from '../utils/theme';
import { useTheme } from '../contexts/ThemeContext';

interface BarChartProps {
  data: ChartDataPoint[];
  actualData?: ChartDataPoint[];
  title: string;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  actualData, 
  title, 
  className = '' 
}) => {
  const { isDark } = useTheme();
  const chartColors = getChartColors(isDark);
  
  const chartData = data.map((projection, index) => ({
    name: projection.name,
    projection: projection.value,
    actual: actualData?.[index]?.value || 0,
    difference: projection.value - (actualData?.[index]?.value || 0)
  }));

  return (
    <div className={`rounded-2xl ${THEME_CLASSES.CARD_BG} ${className}`} style={{ padding: '14px' }}>
      <div className="flex justify-start mb-2">
        <h3 className="text-gray-900 dark:text-white">{title}</h3>
      </div>

      <div style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
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
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={(value) => {
                if (value === 0) return '0';
                return `${value}M`;
              }}
            />
            <Tooltip 
              contentStyle={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none'
              }}
              formatter={(value: number, name: string) => {
                const formattedValue = formatChartValue(value);
                return [formattedValue, name === 'actual' ? 'Actuals' : 'Projections'];
              }}
            />
            <Bar 
              dataKey="actual" 
              stackId="a" 
              fill={chartColors.primary} 
              radius={[0, 0, 0, 0]}
              maxBarSize={20}
            />
            <Bar 
              dataKey="difference" 
              stackId="a" 
              fill={chartColors.primary} 
              opacity={0.5}
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;

