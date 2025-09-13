import { useState } from 'react';
import { Bell, Mail, Smartphone, Clock, CheckCircle, AlertTriangle, Settings } from 'lucide-react';
import Navigation from '../components/Navigation';
import toast from 'react-hot-toast';

const MonitoringPage = () => {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true,
    monthlyReports: true,
    breachAlerts: true,
    removalUpdates: true,
    scanCompletions: true,
  });

  const [alertHistory] = useState([
    {
      id: 1,
      type: 'removal_completed',
      title: 'Data removed from WhitePages.com',
      message: 'Your personal information has been successfully removed from WhitePages.com. Verification screenshot captured.',
      timestamp: '2024-01-15T14:30:00Z',
      status: 'resolved',
      priority: 'medium',
    },
    {
      id: 2,
      type: 'exposure_found',
      title: 'New exposure detected on PeopleSearch.net',
      message: 'We found 2 new records containing your information. Removal request has been automatically submitted.',
      timestamp: '2024-01-14T09:15:00Z',
      status: 'in_progress',
      priority: 'high',
    },
    {
      id: 3,
      type: 'scan_completed',
      title: 'Weekly scan completed',
      message: 'Scanned 247 data brokers. Found 3 new exposures and 5 removal confirmations.',
      timestamp: '2024-01-13T02:00:00Z',
      status: 'resolved',
      priority: 'low',
    },
    {
      id: 4,
      type: 'breach_alert',
      title: 'New data breach reported',
      message: 'A company you may have interacted with (TechCorp) reported a data breach. We\'re scanning for your information.',
      timestamp: '2024-01-12T16:45:00Z',
      status: 'monitoring',
      priority: 'high',
    },
  ]);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated');
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'removal_completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'exposure_found':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'scan_completed':
        return <Settings className="h-5 w-5 text-blue-500" />;
      case 'breach_alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Resolved</span>;
      case 'in_progress':
        return <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">In Progress</span>;
      case 'monitoring':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Monitoring</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">High</span>;
      case 'medium':
        return <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">Medium</span>;
      case 'low':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Low</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-xs font-medium">Normal</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-navy-900 mb-2">Monitoring & Alerts</h1>
          <p className="text-slate-600 font-body">Configure your notification preferences and view alert history</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notification Preferences */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold font-heading text-navy-900">Notification Preferences</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Delivery Channels */}
                  <div>
                    <h3 className="text-sm font-medium font-heading text-navy-900 mb-3">Delivery Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">Email Alerts</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.emailAlerts}
                            onChange={(e) => handleNotificationChange('emailAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">SMS Alerts</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.smsAlerts}
                            onChange={(e) => handleNotificationChange('smsAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">Push Notifications</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.pushNotifications}
                            onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Alert Types */}
                  <div>
                    <h3 className="text-sm font-medium font-heading text-navy-900 mb-3">Alert Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Breach Alerts</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.breachAlerts}
                            onChange={(e) => handleNotificationChange('breachAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Removal Updates</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.removalUpdates}
                            onChange={(e) => handleNotificationChange('removalUpdates', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Scan Completions</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.scanCompletions}
                            onChange={(e) => handleNotificationChange('scanCompletions', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Report Frequency */}
                  <div>
                    <h3 className="text-sm font-medium font-heading text-navy-900 mb-3">Report Frequency</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Weekly Reports</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.weeklyReports}
                            onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Monthly Reports</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.monthlyReports}
                            onChange={(e) => handleNotificationChange('monthlyReports', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold font-heading text-navy-900">Alert History</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {alertHistory.map((alert) => (
                    <div key={alert.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start space-x-4">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium font-heading text-navy-900">{alert.title}</h3>
                            <div className="flex items-center space-x-2">
                              {getPriorityBadge(alert.priority)}
                              {getStatusBadge(alert.status)}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-2 font-body">{alert.message}</p>
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimestamp(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {alertHistory.length === 0 && (
                  <div className="text-center py-8">
                    <Bell className="mx-auto h-12 w-12 text-slate-400" />
                    <h3 className="mt-2 text-sm font-medium font-heading text-navy-900">No alerts yet</h3>
                    <p className="mt-1 text-sm text-slate-500 font-body">
                      We'll notify you when we find exposures or complete removals
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  }
};

export default MonitoringPage;