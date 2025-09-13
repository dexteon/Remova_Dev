import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, Clock, AlertTriangle, Camera, X } from 'lucide-react';
import Navigation from '../components/Navigation';
import LoadingSkeleton from '../components/LoadingSkeleton';

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBroker, setSelectedBroker] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - would come from Optery API
  const [brokerData, setBrokerData] = useState([
    {
      id: 1,
      name: 'WhitePages.com',
      category: 'People Search',
      status: 'removed',
      riskLevel: 'high',
      recordsFound: 3,
      lastUpdated: '2024-01-15',
      screenshots: {
        before: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
        after: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      },
      details: {
        exposedData: ['Full Name', 'Address', 'Phone Number', 'Age'],
        removalDate: '2024-01-15',
        verificationDate: '2024-01-18',
      }
    },
    {
      id: 2,
      name: 'PeopleSearch.net',
      category: 'Background Checks',
      status: 'in_progress',
      riskLevel: 'medium',
      recordsFound: 2,
      lastUpdated: '2024-01-14',
      screenshots: {
        before: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
        after: null,
      },
      details: {
        exposedData: ['Full Name', 'Previous Addresses', 'Associates'],
        submissionDate: '2024-01-14',
        expectedCompletion: '2024-01-21',
      }
    },
    {
      id: 3,
      name: 'BeenVerified.com',
      category: 'People Search',
      status: 'removed',
      riskLevel: 'high',
      recordsFound: 5,
      lastUpdated: '2024-01-12',
      screenshots: {
        before: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
        after: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
      },
      details: {
        exposedData: ['Full Name', 'Address', 'Phone', 'Email', 'Social Media'],
        removalDate: '2024-01-12',
        verificationDate: '2024-01-15',
      }
    },
    {
      id: 4,
      name: 'Intelius.com',
      category: 'Background Checks',
      status: 'found',
      riskLevel: 'medium',
      recordsFound: 1,
      lastUpdated: '2024-01-13',
      screenshots: {
        before: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
        after: null,
      },
      details: {
        exposedData: ['Full Name', 'Address History'],
        discoveredDate: '2024-01-13',
        priority: 'medium',
      }
    },
  ]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredData = brokerData.filter(broker => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         broker.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || broker.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'removed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'found':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'removed':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Removed</span>;
      case 'in_progress':
        return <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">In Progress</span>;
      case 'found':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">Found</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">High Risk</span>;
      case 'medium':
        return <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">Medium Risk</span>;
      case 'low':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Low Risk</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-medium">Unknown</span>;
    }
  };

  const stats = {
    total: brokerData.length,
    removed: brokerData.filter(b => b.status === 'removed').length,
    inProgress: brokerData.filter(b => b.status === 'in_progress').length,
    found: brokerData.filter(b => b.status === 'found').length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-navy-900 mb-2">Data Broker Reports</h1>
          <p className="text-slate-600 font-body">Detailed view of data exposure and removal evidence</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-navy-900">{stats.total}</div>
              <div className="text-sm text-slate-600">Total Brokers</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600">{stats.removed}</div>
              <div className="text-sm text-slate-600">Removed</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-alert-600">{stats.inProgress}</div>
              <div className="text-sm text-slate-600">In Progress</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.found}</div>
              <div className="text-sm text-slate-600">Found</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search brokers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="removed">Removed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="found">Found</option>
                </select>
              </div>
            </div>
            
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Data Broker Table */}
        {isLoading ? (
          <LoadingSkeleton type="table" />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Data Broker
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Records
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Evidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredData.map((broker) => (
                    <tr key={broker.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(broker.status)}
                          <div>
                            <div className="font-medium font-heading text-navy-900">{broker.name}</div>
                            <div className="text-sm text-slate-500">{broker.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(broker.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRiskBadge(broker.riskLevel)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-navy-900">
                        {broker.recordsFound}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {broker.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {broker.screenshots.before && (
                            <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded text-xs">
                              <Camera className="h-3 w-3" />
                              <span>Before</span>
                            </div>
                          )}
                          {broker.screenshots.after && (
                            <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded text-xs">
                              <Camera className="h-3 w-3" />
                              <span>After</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedBroker(broker)}
                          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredData.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-medium text-slate-900">No results found</h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedBroker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedBroker.name}</h2>
                  <p className="text-slate-600">{selectedBroker.category}</p>
                </div>
                <button
                  onClick={() => setSelectedBroker(null)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Removal Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Status:</span>
                      {getStatusBadge(selectedBroker.status)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Risk Level:</span>
                      {getRiskBadge(selectedBroker.riskLevel)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Records Found:</span>
                      <span className="font-medium">{selectedBroker.recordsFound}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Last Updated:</span>
                      <span className="font-medium">{selectedBroker.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-slate-900 mb-3 mt-6">Exposed Data</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBroker.details.exposedData.map((data: string, index: number) => (
                      <span key={index} className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                        {data}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Evidence Screenshots</h3>
                  <div className="space-y-4">
                    {selectedBroker.screenshots.before && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Before Removal</h4>
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                          <img
                            src={selectedBroker.screenshots.before}
                            alt="Before removal"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    {selectedBroker.screenshots.after && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-700 mb-2">After Removal</h4>
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                          <img
                            src={selectedBroker.screenshots.after}
                            alt="After removal"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;