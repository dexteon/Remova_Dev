import React, { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw, AlertTriangle, Calendar, Filter, ExternalLinkIcon } from 'lucide-react';
import PublicHeader from '../components/PublicHeader';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { rssAPI, RssItem, TwitterSource } from '../services/rssAPI';

const LiveBreachNewsPage = () => {
  const [activeTab, setActiveTab] = useState<'rss' | 'twitter'>('rss');
  const [news, setNews] = useState<RssItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterSource, setFilterSource] = useState('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  const twitterSources = rssAPI.getTwitterSources();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await rssAPI.getRssItems({ limit: 50 });
      setNews(response.items);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch RSS news:', err);
      setError(err instanceof Error ? err.message : 'Failed to load news');
    } finally {
      setIsLoading(false);
    }

  const filteredNews = filterSource === 'all' 
    ? news 
    : news.filter(item => item.source.toLowerCase().includes(filterSource.toLowerCase()));

  const sources = Array.from(new Set(news.map(item => item.source))).sort();

  const refreshFeeds = async () => {
    if (isRefreshing) return;
    
    try {
      setIsRefreshing(true);
      await rssAPI.refreshFeeds();
      await fetchNews();
    } catch (err) {
      console.error('Failed to refresh feeds:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTabChange = (tab: 'rss' | 'twitter') => {
    setActiveTab(tab);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}mo ago`;
  };

  const getCategoryFromSource = (source: string): string => {
    if (source.toLowerCase().includes('breach')) return 'Data Breach';
    if (source.toLowerCase().includes('security')) return 'Security';
    if (source.toLowerCase().includes('upguard')) return 'Analysis';
    if (source.toLowerCase().includes('thales')) return 'Industry Insights';
    return 'Security News';
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'data breach':
        return 'bg-red-100 text-red-800';
      case 'security':
      case 'security news':
        return 'bg-orange-100 text-orange-800';
      case 'analysis':
        return 'bg-purple-100 text-purple-800';
      case 'industry insights':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const renderRssTab = () => (
    <div>
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
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-alert-400" />
          <h3 className="mt-2 text-lg font-medium font-heading text-navy-900">Failed to load news</h3>
          <p className="mt-1 text-slate-500 font-body">{error}</p>
          <button
            onClick={fetchNews}
            className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => {
            const category = getCategoryFromSource(item.source);
            return (
              <article key={item.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                      {category}
                    </span>
                    <span className="text-xs text-slate-500">{formatTimeAgo(item.publishedAt)}</span>
                  </div>
                  
                  <h3 className="font-semibold font-heading text-navy-900 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed font-body">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
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
            );
          })}
        </div>
      )}

      {filteredNews.length === 0 && !isLoading && !error && (
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-lg font-medium font-heading text-navy-900">No news found</h3>
          <p className="mt-1 text-slate-500 font-body">
            Try adjusting your filter or check back later for new articles
          </p>
        </div>
      )}
    </div>
  );

  const renderTwitterTab = () => (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-800 font-body">
          <strong>Note:</strong> Twitter/X feeds require API access. Below are curated security experts to follow directly on X/Twitter for real-time breach alerts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {twitterSources.map((source) => (
          <div key={source.source_handle} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Twitter/X
              </span>
            </div>
            
            <h3 className="font-semibold font-heading text-navy-900 mb-2">
              {source.source_handle}
            </h3>
            
            <p className="text-sm text-slate-600 mb-4 leading-relaxed font-body">
              {source.description}
            </p>
            
            <a
              href={source.alerts}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors font-medium"
            >
              <span>View on X</span>
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );

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
              disabled={isRefreshing || isLoading}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
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

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-slate-200 mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => handleTabChange('rss')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'rss'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                RSS News
              </button>
              <button
                onClick={() => handleTabChange('twitter')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'twitter'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                X/Twitter Sources
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'rss' ? renderRssTab() : renderTwitterTab()}

        {/* RSS Sources Info */}
        <div className="mt-12 bg-white rounded-lg border border-slate-200 p-6" style={{ display: activeTab === 'rss' ? 'block' : 'none' }}>
          <h3 className="font-semibold font-heading text-navy-900 mb-4">Our Trusted Sources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'DataBreaches.net', description: 'Investigative reporting on data breaches' },
              { name: 'HaveIBeenPwned', description: 'Troy Hunt\'s breach discovery service' },
              { name: 'UpGuard', description: 'Cybersecurity research and analysis' },
              { name: 'IT Pro', description: 'Enterprise security news and insights' },
              { name: 'DataBreachToday', description: 'Breaking cybersecurity news' },
              { name: 'Thales Group', description: 'Digital identity and security research' },
            ].map((source, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded-lg">
                <h4 className="font-medium font-heading text-navy-900 text-sm">{source.name}</h4>
                <p className="text-xs text-slate-600 mt-1 font-body">{source.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBreachNewsPage;