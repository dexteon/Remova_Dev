import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, Camera, Activity, Download, RefreshCw, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalExposures: 0,
    totalRemovals: 0,
    inProgress: 0,
    nextScanTime: '',
  });

  const [recentActivity, _setRecentActivity] = useState([
    {
      id: 1,
      type: 'removal_completed',
      broker: 'WhitePages.com',
      timestamp: '2 hours ago',
      status: 'completed',
    },
    {
      id: 2,
      type: 'exposure_found',
      broker: 'PeopleSearch.net',
      timestamp: '5 hours ago',
      status: 'in_progress',
    },
    {
      id: 3,
      type: 'removal_completed',
      broker: 'BeenVerified.com',
      timestamp: '1 day ago',
      status: 'completed',
    },
    {
      id: 4,
      type: 'evidence_captured',
      broker: 'Intelius.com',
      timestamp: '2 days ago',
      status: 'completed',
    },
  ]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setStats({
        totalExposures: 127,
        totalRemovals: 89,
        inProgress: 23,
        nextScanTime: 'Tomorrow at 2:00 AM',
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'removal_completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'exposure_found':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'evidence_captured':
        return <Camera className="h-5 w-5 text-blue-500" />;
      default:
        return <Activity className="h-5 w-5 text-slate-400" />;
    }
  };

  const getActivityMessage = (type: string, broker: string) => {
    switch (type) {
      case 'removal_completed':
        return `Successfully removed your data from ${broker}`;
      case 'exposure_found':
        return `Found new data exposure on ${broker}`;
      case 'evidence_captured':
        return `Captured before/after evidence from ${broker}`;
      default:
        return `Activity on ${broker}`;
    }
  };

  const quickActions = [
    {
      title: 'Start New Scan',
      description: 'Run a fresh scan across all data brokers',
      icon: RefreshCw,
      action: () => console.log('Start scan'),
      color: 'blue',
    },
    {
      title: 'Review Exposures',
      description: 'Check your latest exposure report',
      icon: Shield,
      action: () => console.log('Review exposures'),
      color: 'orange',
    },
    {
      title: 'Download Report',
      description: 'Export your privacy protection summary',
      icon: Download,
      action: () => console.log('Download report'),
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-navy-900 mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-slate-600 font-body">Here's your privacy protection overview</p>
        </div>

        {/* Protection Snapshot */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold font-heading text-navy-900 mb-4">Protection Snapshot</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <LoadingSkeleton type="card" count={4} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-primary-600" />
                  </div>
                  <span className="text-2xl font-bold text-navy-900">{stats.totalExposures}</span>
                </div>
                <h3 className="font-semibold font-heading text-navy-900 mb-1">Exposures Found</h3>
                <p className="text-sm text-slate-600">Total data broker listings discovered</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-success-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-success-600" />
                  </div>
                  <span className="text-2xl font-bold text-navy-900">{stats.totalRemovals}</span>
                </div>
                <h3 className="font-semibold font-heading text-navy-900 mb-1">Removed</h3>
                <p className="text-sm text-slate-600">Successfully removed records</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-alert-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-alert-600" />
                  </div>
                  <span className="text-2xl font-bold text-navy-900">{stats.inProgress}</span>
                </div>
                <h3 className="font-semibold font-heading text-navy-900 mb-1">In Progress</h3>
                <p className="text-sm text-slate-600">Removal requests pending</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-success-100 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-success-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-navy-900">Next Scan</div>
                    <div className="text-xs text-slate-600">{stats.nextScanTime}</div>
                  </div>
                </div>
                <h3 className="font-semibold font-heading text-navy-900 mb-1">Monitoring Active</h3>
                <p className="text-sm text-slate-600">Continuous protection enabled</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold font-heading text-navy-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                {isLoading ? (
                  <LoadingSkeleton type="text" count={4} />
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium font-heading text-navy-900 truncate">{activity.broker}</p>
                            <span className="text-sm text-slate-500">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-slate-600 font-body">
                            {getActivityMessage(activity.type, activity.broker)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold font-heading text-navy-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    const colorClasses = {
                      blue: 'bg-primary-100 text-primary-600 hover:bg-primary-200',
                      orange: 'bg-alert-100 text-alert-600 hover:bg-alert-200',
                      green: 'bg-success-100 text-success-600 hover:bg-success-200',
                    };
                    
                    return (
                      <button
                        key={index}
                        onClick={action.action}
                        className="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg transition-colors ${colorClasses[action.color as keyof typeof colorClasses]}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium font-heading text-navy-900 group-hover:text-primary-600 transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-slate-600 mt-1 font-body">{action.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Protection Status */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold font-heading text-navy-900">Protection Status</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg border border-success-200">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-success-600" />
                      <div>
                        <p className="font-medium font-heading text-success-900">Active Monitoring</p>
                        <p className="text-sm text-success-700 font-body">Scanning 200+ data brokers</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  </div>

                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-navy-900 mb-1">
                      {Math.round((stats.totalRemovals / stats.totalExposures) * 100)}%
                    </div>
                    <div className="text-sm text-slate-600">Protection Complete</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-success-500 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${(stats.totalRemovals / stats.totalExposures) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;