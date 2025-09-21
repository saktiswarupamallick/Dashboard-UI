import React, { useRef, useEffect, useState } from 'react';
import type { ChartDataPoint } from '../types';

interface LineChartProps {
  data: ChartDataPoint[];
  actualData?: ChartDataPoint[];
  title: string;
  height?: number;
  showLegend?: boolean;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  actualData, 
  title, 
  height = 300, 
  showLegend = true,
  className = '' 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; data: { name: string; projected: number; actual?: number } } | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!data.length) return null;

  const padding = 40;
  const width = 600;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const allData = actualData ? [...data, ...actualData] : data;
  const maxValue = Math.max(...allData.map(d => d.value));
  const minValue = Math.min(...allData.map(d => d.value));
  const valueRange = maxValue - minValue;

  const getX = (index: number) => padding + (index * chartWidth) / (data.length - 1);
  const getY = (value: number) => padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;


  const createAnimatedPath = (dataset: ChartDataPoint[]) => {
    return dataset.map((point, index) => {
      const x = getX(index);
      const targetY = getY(point.value);
      const startY = padding + chartHeight;
      const y = startY + (targetY - startY) * animationProgress;
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;

    const dataIndex = Math.round(((x - padding) / chartWidth) * (data.length - 1));
    if (dataIndex >= 0 && dataIndex < data.length) {
      setHoveredPoint({
        x: event.clientX,
        y: event.clientY,
        data: {
          name: data[dataIndex].name,
          projected: data[dataIndex].value,
          actual: actualData?.[dataIndex]?.value
        }
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {showLegend && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Projected</span>
            </div>
            {actualData && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-gray-400 rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Actual</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {Array.from({ length: 5 }, (_, i) => {
            const y = padding + (i * chartHeight) / 4;
            const value = maxValue - (i * valueRange) / 4;
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                  className="dark:stroke-gray-600"
                />
                <text
                  x={padding - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-500 dark:fill-gray-400"
                >
                  {Math.round(value)}
                </text>
              </g>
            );
          })}

          {data.map((point, index) => (
            <text
              key={index}
              x={getX(index)}
              y={height - padding + 20}
              textAnchor="middle"
              className="text-xs fill-gray-500 dark:fill-gray-400"
            >
              {point.name}
            </text>
          ))}

          {actualData && (
            <path
              d={createAnimatedPath(actualData)}
              fill="none"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="5,5"
              className="transition-all duration-1000"
            />
          )}

          <path
            d={createAnimatedPath(data) + ` L ${getX(data.length - 1)} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`}
            fill="url(#gradient)"
            className="transition-all duration-1000"
          />

          <path
            d={createAnimatedPath(data)}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-1000"
          />

          {data.map((point, index) => (
            <circle
              key={index}
              cx={getX(index)}
              cy={getY(point.value) * animationProgress + (padding + chartHeight) * (1 - animationProgress)}
              r={4}
              fill="#3b82f6"
              className="transition-all duration-1000 hover:r-6 cursor-pointer"
            />
          ))}

          {actualData && actualData.map((point, index) => (
            <circle
              key={`actual-${index}`}
              cx={getX(index)}
              cy={getY(point.value) * animationProgress + (padding + chartHeight) * (1 - animationProgress)}
              r={3}
              fill="#9ca3af"
              className="transition-all duration-1000 hover:r-5 cursor-pointer"
            />
          ))}
        </svg>

        {hoveredPoint && (
          <div
            className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 pointer-events-none"
            style={{
              left: hoveredPoint.x + 10,
              top: hoveredPoint.y - 60,
              transform: 'translateY(-100%)'
            }}
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              {hoveredPoint.data.name}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">
              Projected: {hoveredPoint.data.projected}
            </div>
            {hoveredPoint.data.actual && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Actual: {hoveredPoint.data.actual}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;
