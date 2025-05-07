
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/119c6094-2481-4397-9118-15791e344f1b.png" 
        alt="Tresqu Logo" 
        className={`${sizeClasses[size]}`}
      />
      {showText && (
        <span className="ml-2 font-bold font-display">
          <span className="text-success">Tres</span>
          <span>qu</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
