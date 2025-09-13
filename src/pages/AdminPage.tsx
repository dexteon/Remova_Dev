import { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Clock, Users, Search } from 'lucide-react';
import Navigation from '../components/Navigation';
import LoadingSkeleton from '../components/LoadingSkeleton';

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const [systemStats, setSystemStats] = useState({
    requestsToday: 0,
    errors: 0,
    avgLatency: 0,
    activeUsers: 0,
  });

  const [apiEvents, _setApiEvents] = useState([
    {
      id: 1,
      timestamp: '2024-01-19T14:30:00Z',
      userId: 'user-***1234',
      action: 'POST /v1/members',
      outcome: 'success',
      latency: 245,
      details: 'Member created successfully',
    },
    {
      id: 2,
      timestamp: '2024-01-19T14:25:00Z',
      userId: 'user-***5678',
      action: 'GET /v1/optouts/statistics',
      outcome: 'success',
      latency: 156,
      details: 'Statistics retrieved',
    },
    {
      id: 3,
      timestamp: '2024-01-19T14:20:00Z',
      userId: 'user-***9012',
      action: 'POST /v1/optouts/scan',
      outcome: 'error',
      latency: 5000,
      details: 'Rate limit exceeded',
    },
    {
      id: 4,
      timestamp: '2024-01-19T14:15:00Z',
      userId: 'user-***3456',
      action: 'GET /v1/optouts/events',
      outcome: 'success',
      latency: 189,
      details: 'Events retrieved',
    },
    {
      id: 5,
      timestamp: '2024-01-19T14:10:00Z',
      userId: 'user-***7890',
      action: 'PATCH /v1/members/update',
      outcome: 'success',
      latency: 298,
      details: 'Member profile updated',
    },
  ]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setSystemStats({
        requestsToday: 1247,
        errors: 23,
        avgLatency: 234,
        activeUsers: 89,
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = apiEvents.filter(event => {
    const matchesSearch = event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.outcome === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-slate-400 rounded-full"></div>;
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'success':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Success</span>;
      case 'error':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Error</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-navy-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600 font-body">System monitoring and API traffic overview</p>
        </div>

        {/* System Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold font-heading text-navy-900 mb-4">System Overview</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <LoadingSkeleton type="card" count={4} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Activity className="h-6 w-6 text-primary-600" />
                  </div>
                  <span className="text-2xl font-bold text-navy-900">{systemStats.requestsToday.toLocaleString()}</span>
                </div>
                <h3 className="font-semibold font-heading text-navy-900 mb-1">Requests Today</h3>
                <p className="text-sm text-slate-600">API calls processed</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <span className="text-2xl font-bold text-navy-900">{systemStats.errors}</span>
                </div>
                <h3 className="font-semibold font-heading text-navy-900 mb-1">Errors</h3>
                <p className="text-sm text-slate-600">Failed requests today</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-success-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-success-600" />
                  </div>
                  <span className="text-2xl font-bold text-navy-900">{systemStats.avgLatency}ms</span>
                </div>
                <h3 className="font-semibold font-heading text-navy-900 mb-1">Avg Latency</h3>
                <p className="text-sm text-slate-600">Response time</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-success-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-success-600" />
                  </div>
                  <span className="text-2xl font-bold text-navy-900">{systemStats.activeUsers}</span>
                </div>
                <h3 className="font-semibold font-heading text-navy-900 mb-1">Active Users</h3>
                <p className="text-sm text-slate-600">Online now</p>
              </div>
            </div>
          )}
        </div>

        {/* API Event Log */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold font-heading text-navy-900">API Event Log</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Outcomes</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-6">
                <LoadingSkeleton type="table" />
              </div>
            ) : (
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Outcome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Latency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-900">
                        {formatTimestamp(event.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600">
                        {event.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm bg-slate-100 px-2 py-1 rounded">
                          {event.action}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getOutcomeIcon(event.outcome)}
                          {getOutcomeBadge(event.outcome)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-900">
                        <span className={event.latency > 1000 ? 'text-red-600' : event.latency > 500 ? 'text-orange-600' : 'text-green-600'}>
                          {event.latency}ms
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {event.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {filteredEvents.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <Activity className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-2 text-sm font-medium font-heading text-navy-900">No events found</h3>
              <p className="mt-1 text-sm text-slate-500 font-body">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;