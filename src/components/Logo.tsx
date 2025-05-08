import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "lg",
  showText = true,
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-14 w-14",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img src="/3q.png" alt="Tresqu Logo" className={`${sizeClasses[size]}`} />
      {showText && (
        <span className="ml-2 text-2xl font-bold font-display">Tresqu</span>
      )}
    </div>
  );
};

export default Logo;
