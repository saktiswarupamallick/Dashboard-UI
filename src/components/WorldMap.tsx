import React, { useState } from 'react';
import type { LocationData } from '../types';
import MapSvg from '../assets/Map.svg';
import { THEME_CLASSES } from '../utils/theme';

interface WorldMapProps {
  data: LocationData[];
  className?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ data, className = '' }) => {
  const [hoveredLocation, setHoveredLocation] = useState<LocationData | null>(null);

  const locations = [
    { name: 'New York', x: 190, y: 140, data: data.find(d => d.name === 'New York') },
    { name: 'San Francisco', x: 80, y: 140, data: data.find(d => d.name === 'San Francisco') },
    { name: 'Sydney', x: 500, y: 220, data: data.find(d => d.name === 'Sydney') },
    { name: 'Singapore', x: 440, y: 170, data: data.find(d => d.name === 'Singapore') }
  ];

  return (
    <div className={`h-full flex flex-col ${THEME_CLASSES.CARD_BG} rounded-2xl ${className}`} style={{ padding: '24px' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 text-secondary dark:text-white">Revenue by Location</h3>
      </div>

      <div className="relative mb-6">
        <div className="w-full  rounded-lg overflow-hidden">
          <img 
            src={MapSvg} 
            alt="World Map" 
            className="w-full h-full object-cover"
          />
          
          {locations.map((location) => {
            if (!location.data) return null;
            
            return (
              <div
                key={location.name}
                className="absolute cursor-pointer"
                style={{
                  left: `${(location.x / 600) * 100}%`,
                  top: `${(location.y / 300) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredLocation(location.data!)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                <div className={`w-3 h-3  rounded-full border-2 dark:bg-purple-300 bg-black border-white shadow-lg`}></div>
              </div>
            );
          })}

          {hoveredLocation && (
            <div
              className={`absolute ${THEME_CLASSES.CARD_BG} border ${THEME_CLASSES.BORDER_DEFAULT} rounded-lg shadow-lg p-3 z-10`}
              style={{
                left: '50%',
                top: '20px',
                transform: 'translateX(-50%)'
              }}
            >
              <div className={`text-sm font-medium ${THEME_CLASSES.TEXT_PRIMARY}`}>
                {hoveredLocation.name}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                {hoveredLocation.percentage}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {data.map((location) => (
          <div
            key={location.name}
            className="space-y-2"
            onMouseEnter={() => setHoveredLocation(location)}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                
                <span className={`text-sm font-normal ${THEME_CLASSES.TEXT_PRIMARY}`}>
                  {location.name}
                </span>
              </div>
              <span className={`text-sm font-medium ${THEME_CLASSES.TEXT_PRIMARY}`}>
                {location.percentage}
              </span>
            </div>
            
            <div className={`w-full h-1 ${THEME_CLASSES.BORDER_DEFAULT} rounded-full overflow-hidden`}>
              <div 
                className="h-full bg-[#A8C5DA] rounded-full transition-all duration-300"
                style={{ width: `${(location.value / 100) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
