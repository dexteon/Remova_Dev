import React, { useState } from 'react';
import { HelpCircle, MessageCircle, FileText, Shield, Clock, CheckCircle, Send } from 'lucide-react';
import Navigation from '../components/Navigation';
import toast from 'react-hot-toast';

const SupportPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const troubleshooters = [
    {
      id: 'not-seeing-updates',
      title: 'Not seeing removal updates?',
      description: 'Removals can take time. We\'ll notify you as soon as brokers confirm changes.',
      icon: Clock,
      color: 'orange',
      steps: [
        'Data broker removals typically take 7-30 days to process',
        'We automatically follow up on pending requests',
        'You\'ll receive email confirmation when removals are verified',
        'Check your spam folder for notifications',
      ],
    },
    {
      id: 'found-new-exposure',
      title: 'Found a new exposure?',
      description: 'Report new data broker listings we might have missed.',
      icon: Shield,
      color: 'red',
      steps: [
        'Copy the URL of the data broker page showing your information',
        'Use the "Report New Exposure" button in your dashboard',
        'We\'ll investigate and add it to your removal queue',
        'You\'ll be notified when the removal request is submitted',
      ],
    },
    {
      id: 'account-recovery',
      title: 'Account recovery help',
      description: 'Trouble accessing your account or need to reset your password.',
      icon: HelpCircle,
      color: 'blue',
      steps: [
        'Use the "Forgot Password" link on the login page',
        'Check your email for the reset link (including spam folder)',
        'If you don\'t receive an email, contact support below',
        'For security, we may ask you to verify your identity',
      ],
    },
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Support ticket submitted successfully. We\'ll respond within 24 hours.');
      setContactForm({ subject: '', message: '', priority: 'medium' });
    } catch (error) {
      toast.error('Failed to submit support ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-navy-900 mb-2">Support Center</h1>
          <p className="text-slate-600 font-body">Get help with your privacy protection journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Troubleshooters */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-xl font-semibold font-heading text-navy-900 mb-6">Common Questions</h2>
              <div className="space-y-6">
                {troubleshooters.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedCategory === item.id;
                  
                  return (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => setSelectedCategory(isSelected ? '' : item.id)}
                        className="w-full p-6 text-left hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${
                            item.color === 'orange' ? 'bg-orange-100' :
                            item.color === 'red' ? 'bg-red-100' :
                            'bg-primary-100'
                          }`}>
                            <Icon className={`h-6 w-6 ${
                              item.color === 'orange' ? 'text-orange-600' :
                              item.color === 'red' ? 'text-red-600' :
                              'text-primary-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold font-heading text-navy-900 mb-1">{item.title}</h3>
                            <p className="text-slate-600 font-body">{item.description}</p>
                          </div>
                          <div className={`transform transition-transform ${isSelected ? 'rotate-180' : ''}`}>
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                      
                      {isSelected && (
                        <div className="px-6 pb-6 border-t border-slate-200 bg-slate-50">
                          <div className="pt-4">
                            <h4 className="font-medium font-heading text-navy-900 mb-3">What to do next:</h4>
                            <ol className="space-y-2">
                              {item.steps.map((step, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                  <div className="bg-primary-100 text-primary-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                                    {index + 1}
                                  </div>
                                  <span className="text-sm text-slate-700 font-body">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold font-heading text-navy-900">Additional Resources</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="/privacy"
                    className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-primary-600" />
                    <div>
                      <h3 className="font-medium font-heading text-navy-900">Privacy Policy</h3>
                      <p className="text-sm text-slate-600 font-body">How we protect your data</p>
                    </div>
                  </a>
                  
                  <a
                    href="/data-processing"
                    className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Shield className="h-5 w-5 text-success-600" />
                    <div>
                      <h3 className="font-medium font-heading text-navy-900">Data Processing</h3>
                      <p className="text-sm text-slate-600 font-body">How we handle your information</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold font-heading text-navy-900">Contact Support</h2>
                </div>
              </div>
              <div className="p-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={contactForm.subject}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-2">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={contactForm.priority}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="low">Low - General question</option>
                      <option value="medium">Medium - Account issue</option>
                      <option value="high">High - Urgent privacy concern</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Please describe your issue in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Ticket</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium font-heading text-primary-900 mb-1">Response Time</h4>
                      <p className="text-sm text-primary-700 font-body">
                        We typically respond within 24 hours. High priority issues are addressed within 4 hours.
                      </p>
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

export default SupportPage;