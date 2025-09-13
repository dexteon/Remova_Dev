import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play, AlertTriangle } from 'lucide-react';

interface BreachNewsItem {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt: string;
  summary: string;
}

interface LiveBreachNewsProps {
  autoRotate?: boolean;
  showControls?: boolean;
  maxItems?: number;
  className?: string;
}

const LiveBreachNews: React.FC<LiveBreachNewsProps> = ({ 
  autoRotate = true, 
  showControls = true, 
  maxItems = 3,
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [isHovered, setIsHovered] = useState(false);

  // Mock data - would be fetched from RSS feeds via backend
  const mockNews: BreachNewsItem[] = [
    {
      id: '1',
      title: 'Allianz Life - 1,115,061 breached accounts',
      link: 'https://haveibeenpwned.com/Breach/AllianzLife',
      source: 'HaveIBeenPwned',
      publishedAt: '2025-01-18T20:20:19Z',
      summary: 'Allianz Life suffered a July 2025 breach; over 1.1M records exposed including email, name, gender, DOB, phone, address.'
    },
    {
      id: '2',
      title: 'Everything we know about the Workday data breach so far',
      link: 'https://www.itpro.com/security/data-breaches/workday-data-breach',
      source: 'IT Pro',
      publishedAt: '2025-01-18T10:48:57Z',
      summary: 'Workday confirms data breach after threat actors accessed a third-party CRM platform.'
    },
    {
      id: '3',
      title: 'Cisco Patches Maximum-Severity Firewall Flaw',
      link: 'https://www.databreachtoday.in/cisco-patches-maximum-severity-firewall-flaw',
      source: 'DataBreachToday',
      publishedAt: '2025-01-19T08:53:17Z',
      summary: 'Cisco warns of a critical firewall vulnerability that could allow hackers to commandeer servers; patch recommended urgently.'
    },
    {
      id: '4',
      title: 'Two agencies in one state investigated and fined Healthplex',
      link: 'https://databreaches.net/2025/08/19/two-agencies-investigated-healthplex',
      source: 'DataBreaches.net',
      publishedAt: '2025-01-19T12:28:35Z',
      summary: 'Discusses regulatory dynamics in a complex health data breach case.'
    }
  ];

  const visibleNews = mockNews.slice(0, maxItems);

  useEffect(() => {
    if (!isPlaying || isHovered || visibleNews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleNews.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, visibleNews.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + visibleNews.length) % visibleNews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % visibleNews.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (visibleNews.length === 0) {
    return (
      <div className={`bg-slate-100 rounded-lg p-6 text-center ${className}`}>
        <AlertTriangle className="h-8 w-8 text-alert-400 mx-auto mb-2" />
        <h3 className="text-lg font-medium font-heading text-navy-900 mb-1">No breach news available</h3>
        <p className="text-slate-600 font-body">We're working to restore the live feed. Check back soon.</p>
      </div>
    );
  }

  const currentItem = visibleNews[currentIndex];

  return (
    <div 
      className={`bg-white rounded-lg border border-slate-200 overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Live breach news"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-slate-900">Live Breach News</h3>
          </div>
          
          {showControls && visibleNews.length > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlayPause}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={isPlaying ? 'Pause rotation' : 'Resume rotation'}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
              
              <button
                onClick={handlePrevious}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Previous news item"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <span className="text-xs text-slate-500">
                {currentIndex + 1} / {visibleNews.length}
              </span>
              
              <button
                onClick={handleNext}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Next news item"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div 
          className="transition-all duration-300 ease-in-out"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-base font-medium font-heading text-navy-900 leading-tight pr-4">
              {currentItem.title}
            </h4>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-xs text-slate-500">{formatTimeAgo(currentItem.publishedAt)}</span>
              <a
                href={currentItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 transition-colors"
                aria-label="Read full article"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <p className="text-sm text-slate-600 mb-3 leading-relaxed font-body">
            {currentItem.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {currentItem.source}
            </span>
            
            {visibleNews.length > 1 && (
              <div className="flex space-x-1">
                {visibleNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary-600' : 'bg-slate-300'
                    }`}
                    aria-label={`Go to news item ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBreachNews;