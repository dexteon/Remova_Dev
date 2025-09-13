import { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw, AlertTriangle, Calendar, Filter } from 'lucide-react';
import PublicHeader from '../components/PublicHeader';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { supabase } from '../integrations/supabase/client';
import TwitterNewsSources from '../components/TwitterNewsSources';

interface LiveNewsItem {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt: string;
  summary: string;
}

const LiveBreachNewsPage = () => {
  const [news, setNews] = useState<LiveNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterSource, setFilterSource] = useState('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke('rss-feed');
      
      if (error) {
        throw error;
      }

      if (data) {
        setNews(data);
        setLastUpdated(new Date());
      }
    } catch (err: any) {
      console.error('Error fetching RSS feed:', err);
      setError('Failed to load breach news. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredNews = filterSource === 'all' 
    ? news 
    : news.filter(item => item.source === filterSource);

  const sources = Array.from(new Set(news.map(item => item.source)));

  const refreshFeeds = () => {
    fetchNews();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-heading text-navy-900 mb-2">Live Breach News</h1>
              <p className="text-slate-600 font-body">Real-time updates from trusted security sources</p>
            </div>
            <button
              onClick={refreshFeeds}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 text-sm text-slate-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-slate-400" />
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
            <span className="text-sm text-slate-500">
              Showing {filteredNews.length} of {news.length} articles
            </span>
          </div>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoadingSkeleton type="card" count={6} />
          </div>
        ) : error ? (
          <div className="text-center py-12 col-span-full">
            <AlertTriangle className="mx-auto h-12 w-12 text-alert-400" />
            <h3 className="mt-2 text-lg font-medium font-heading text-navy-900">Error Loading News</h3>
            <p className="mt-1 text-slate-500 font-body">{error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article key={item.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs text-slate-500">{formatTimeAgo(item.publishedAt)}</span>
                  </div>
                  
                  <h3 className="font-semibold font-heading text-navy-900 mb-3 leading-tight flex-grow">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed font-body">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {item.source}
                    </span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 transition-colors flex items-center space-x-1"
                    >
                      <span className="text-sm font-medium">Read more</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredNews.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-alert-400" />
            <h3 className="mt-2 text-lg font-medium font-heading text-navy-900">No news available</h3>
            <p className="mt-1 text-slate-500 font-body">
              We're working to restore the live feed. Check back soon.
            </p>
          </div>
        )}

        <TwitterNewsSources />
      </div>
    </div>
  );
};

export default LiveBreachNewsPage;