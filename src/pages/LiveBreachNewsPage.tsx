import React, { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw, AlertTriangle, Calendar, Filter } from 'lucide-react';
import PublicHeader from '../components/PublicHeader';
import LoadingSkeleton from '../components/LoadingSkeleton';

interface NewsItem {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt: string;
  summary: string;
  category: string;
}

const LiveBreachNewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterSource, setFilterSource] = useState('all');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock RSS feed data
  const mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'Allianz Life - 1,115,061 breached accounts',
      link: 'https://haveibeenpwned.com/Breach/AllianzLife',
      source: 'HaveIBeenPwned',
      publishedAt: '2024-01-18T20:20:19Z',
      summary: 'Allianz Life suffered a July 2024 breach; over 1.1M records exposed including email, name, gender, DOB, phone, address.',
      category: 'Data Breach'
    },
    {
      id: '2',
      title: 'Everything we know about the Workday data breach so far',
      link: 'https://www.itpro.com/security/data-breaches/workday-data-breach',
      source: 'IT Pro',
      publishedAt: '2024-01-18T10:48:57Z',
      summary: 'Workday confirms data breach after threat actors accessed a third-party CRM platform.',
      category: 'Data Breach'
    },
    {
      id: '3',
      title: 'Cisco Patches Maximum-Severity Firewall Flaw',
      link: 'https://www.databreachtoday.in/cisco-patches-maximum-severity-firewall-flaw',
      source: 'DataBreachToday',
      publishedAt: '2024-01-19T08:53:17Z',
      summary: 'Cisco warns of a critical firewall vulnerability that could allow hackers to commandeer servers; patch recommended urgently.',
      category: 'Security Vulnerability'
    },
    {
      id: '4',
      title: 'Two agencies investigated and fined Healthplex',
      link: 'https://databreaches.net/2024/08/19/two-agencies-investigated-healthplex',
      source: 'DataBreaches.net',
      publishedAt: '2024-01-19T12:28:35Z',
      summary: 'Discusses regulatory dynamics in a complex health data breach case.',
      category: 'Regulatory'
    },
    {
      id: '5',
      title: 'Traffic Patterns: The Leakzone Part 2',
      link: 'https://www.upguard.com/breaches/traffic-patterns-the-leakzone-part-2',
      source: 'UpGuard',
      publishedAt: '2024-01-12T23:13:57Z',
      summary: 'UpGuard analyzes the universities, governments, and private companies mentioned in the access logs of hacker forum Leakzone.',
      category: 'Analysis'
    },
    {
      id: '6',
      title: 'Learning From the Outliers: How to Increase Trust Levels in 2024',
      link: 'https://dis-blog.thalesgroup.com/security/2024/05/07/learning-from-the-outliers',
      source: 'Thales Group',
      publishedAt: '2024-01-07T10:54:08Z',
      summary: 'Discusses the importance of trust in digital identities, citing surveys and recommendations for organizations.',
      category: 'Industry Insights'
    },
  ];

  useEffect(() => {
    // Simulate RSS feed loading
    const timer = setTimeout(() => {
      setNews(mockNews);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredNews = filterSource === 'all' 
    ? news 
    : news.filter(item => item.source === filterSource);

  const sources = Array.from(new Set(news.map(item => item.source)));

  const refreshFeeds = async () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Data Breach':
        return 'bg-red-100 text-red-800';
      case 'Security Vulnerability':
        return 'bg-orange-100 text-orange-800';
      case 'Regulatory':
        return 'bg-blue-100 text-blue-800';
      case 'Analysis':
        return 'bg-purple-100 text-purple-800';
      case 'Industry Insights':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
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
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article key={item.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
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
            ))}
          </div>
        )}

        {filteredNews.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-alert-400" />
            <h3 className="mt-2 text-lg font-medium font-heading text-navy-900">No news available</h3>
            <p className="mt-1 text-slate-500 font-body">
              We're working to restore the live feed. Check back soon.
            </p>
          </div>
        )}

        {/* RSS Sources Info */}
        <div className="mt-12 bg-white rounded-lg border border-slate-200 p-6">
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