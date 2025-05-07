
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/6dedce82-27f2-450e-963d-21dbcbb35b07.png" 
        alt="Tresqu Logo" 
        className={`${sizeClasses[size]}`}
      />
      {showText && (
        <span className="ml-2 font-bold font-display">
          Tresqu
        </span>
      )}
    </div>
  );
};

export default Logo;
