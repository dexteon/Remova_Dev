import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'text' | 'avatar' | 'button';
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = 'card', 
  count = 1, 
  className = '' 
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-white rounded-lg border border-slate-200 p-6 ${className}`}>
            <div className="animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                <div className="h-3 bg-slate-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        );

      case 'table':
        return (
          <div className={`bg-white rounded-lg border border-slate-200 overflow-hidden ${className}`}>
            <div className="animate-pulse">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-6 py-4 border-b border-slate-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-slate-200 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-6 bg-slate-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
          </div>
        );

      case 'avatar':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
          </div>
        );

      case 'button':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="h-10 bg-slate-200 rounded-md w-24"></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;