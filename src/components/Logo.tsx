
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/b6f2898a-6513-45fd-a734-c4e9df849741.png" 
          alt="Tresqu Logo" 
          className="h-8 w-auto filter brightness-0 invert sepia hue-rotate-165 saturate-200" 
        />
      </div>
      {showText && (
        <span className="text-xl font-bold font-display">
          <span className="text-highlight">Tres</span>
          <span className="text-foreground">qu</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
