import React from 'react';

interface SvgIconProps {
  src: string;
  className?: string;
  size?: number;
}

const SvgIcon: React.FC<SvgIconProps> = ({ src, className = '', size = 20 }) => {
  return (
    <img 
      src={src} 
      alt="" 
      className={`${className}`}
      style={{ 
        width: size, 
        height: size
      }}
    />
  );
};

export default SvgIcon;
