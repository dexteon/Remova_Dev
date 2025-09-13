import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} text-primary-600 relative`}>
        {/* Simplified detective dog icon using Shield as base */}
        <Shield className="w-full h-full" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-navy-700 rounded-full opacity-60"></div>
      </div>
      {showText && (
        <span className={`font-bold font-heading ${textSizeClasses[size]} text-navy-900`}>
          Remova
        </span>
      )}
    </div>
  );
};

export default Logo;