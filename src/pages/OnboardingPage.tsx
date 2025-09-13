import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, ArrowLeft, Check, MapPin, Mail, Users, Building, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface OnboardingData {
  name: string;
  birthday: string;
  addresses: Array<{ street: string; city: string; state: string; zip: string }>;
  emails: string[];
  phones: string[];
  relatives: Array<{ name: string; relationship: string }>;
  companies: Array<{ name: string; role: string }>;
  plan: string;
}

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<OnboardingData>({
    name: user?.name || '',
    birthday: '',
    addresses: [{ street: '', city: '', state: '', zip: '' }],
    emails: [user?.email || ''],
    phones: [''],
    relatives: [{ name: '', relationship: '' }],
    companies: [{ name: '', role: '' }],
    plan: 'complete-shield',
  });

  useEffect(() => {
    if (user?.hasCompletedOnboarding) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const steps = [
    {
      title: 'Personal Information',
      description: 'Help us identify your data across the web',
      icon: Shield,
    },
    {
      title: 'Addresses',
      description: 'Current and previous addresses help us find more records',
      icon: MapPin,
    },
    {
      title: 'Contact Information',
      description: 'Emails and phone numbers to search for',
      icon: Mail,
    },
    {
      title: 'Relatives & Associates',
      description: 'Family members and close associates (optional)',
      icon: Users,
    },
    {
      title: 'Professional Information',
      description: 'Companies and roles (optional)',
      icon: Building,
    },
    {
      title: 'Choose Your Plan',
      description: 'Select the protection level that\'s right for you',
      icon: Shield,
    },
  ];

  const plans = [
    {
      id: 'essential-protection',
      name: 'Essential Protection',
      price: '$9.99/month',
      features: ['Scan 50 data brokers', 'Basic removal service', 'Monthly reports', 'Email support'],
    },
    {
      id: 'complete-shield',
      name: 'Complete Shield',
      price: '$19.99/month',
      popular: true,
      features: ['Scan 200+ data brokers', 'Priority removal', 'Real-time monitoring', 'Before/after evidence', 'Priority support'],
    },
    {
      id: 'enterprise-guard',
      name: 'Enterprise Guard',
      price: '$39.99/month',
      features: ['Unlimited scans', 'White-glove service', 'Dark web monitoring', 'Legal support', 'Dedicated manager'],
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls to Optery
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user as having completed onboarding  
      updateUser({ hasCompletedOnboarding: true });
      
      toast.success('Welcome to Remova! Your protection is now active.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = (field: keyof OnboardingData) => {
    setData(prev => ({
      ...prev,
      [field]: field === 'addresses' 
        ? [...(prev[field] as any[]), { street: '', city: '', state: '', zip: '' }]
        : field === 'relatives'
        ? [...(prev[field] as any[]), { name: '', relationship: '' }]
        : field === 'companies'
        ? [...(prev[field] as any[]), { name: '', role: '' }]
        : [...(prev[field] as string[]), '']
    }));
  };

  const removeItem = (field: keyof OnboardingData, index: number) => {
    setData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index)
    }));
  };

  const updateItem = (field: keyof OnboardingData, index: number, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).map((item, i) => i === index ? value : item)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={data.birthday}
                onChange={(e) => setData({ ...data, birthday: e.target.value })}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            {data.addresses.map((address, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-slate-900">Address {index + 1}</h4>
                  {data.addresses.length > 1 && (
                    <button
                      onClick={() => removeItem('addresses', index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={address.street}
                    onChange={(e) => updateItem('addresses', index, { ...address, street: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => updateItem('addresses', index, { ...address, city: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => updateItem('addresses', index, { ...address, state: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={address.zip}
                    onChange={(e) => updateItem('addresses', index, { ...address, zip: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem('addresses')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add Another Address
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Addresses</label>
              {data.emails.map((email, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => updateItem('emails', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="email@example.com"
                  />
                  {data.emails.length > 1 && (
                    <button
                      onClick={() => removeItem('emails', index)}
                      className="text-red-600 hover:text-red-700 px-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem('emails')}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                + Add Another Email
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Numbers</label>
              {data.phones.map((phone, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => updateItem('phones', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="(555) 123-4567"
                  />
                  {data.phones.length > 1 && (
                    <button
                      onClick={() => removeItem('phones', index)}
                      className="text-red-600 hover:text-red-700 px-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addItem('phones')}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                + Add Another Phone
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Adding family members and close associates can help us find more data broker records (optional).
            </p>
            {data.relatives.map((relative, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-slate-900">Relative {index + 1}</h4>
                  {data.relatives.length > 1 && (
                    <button
                      onClick={() => removeItem('relatives', index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={relative.name}
                    onChange={(e) => updateItem('relatives', index, { ...relative, name: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    value={relative.relationship}
                    onChange={(e) => updateItem('relatives', index, { ...relative, relationship: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="sibling">Sibling</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem('relatives')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add Another Relative
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Professional information can help identify additional data exposure (optional).
            </p>
            {data.companies.map((company, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-slate-900">Company {index + 1}</h4>
                  {data.companies.length > 1 && (
                    <button
                      onClick={() => removeItem('companies', index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={company.name}
                    onChange={(e) => updateItem('companies', index, { ...company, name: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    placeholder="Your Role/Title"
                    value={company.role}
                    onChange={(e) => updateItem('companies', index, { ...company, role: e.target.value })}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem('companies')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add Another Company
            </button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold font-heading text-navy-900 mb-2">Choose Your Protection Plan</h3>
              <p className="text-slate-600">Select the plan that best fits your privacy needs</p>
            </div>
            
            <div className="grid gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    data.plan === plan.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                  onClick={() => setData({ ...data, plan: plan.id })}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-alert-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold font-heading text-navy-900 mb-1">{plan.name}</h4>
                      <p className="text-2xl font-bold text-navy-900 mb-4">{plan.price}</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <Check className="h-4 w-4 text-success-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      data.plan === plan.id ? 'border-primary-500 bg-primary-500' : 'border-slate-300'
                    }`}>
                      {data.plan === plan.id && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-600" />
            <span className="font-bold font-heading text-xl text-navy-900">Remova</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isCompleted 
                      ? 'bg-success-500 border-success-500 text-white'
                      : isActive
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      isCompleted ? 'bg-success-500' : 'bg-slate-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-500">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-heading text-navy-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-slate-600 font-body">
              {steps[currentStep].description}
            </p>
          </div>

          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between pt-8 mt-8 border-t border-slate-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? (
                <>
                  <Zap className="animate-spin h-4 w-4" />
                  <span>Setting up protection...</span>
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  <span>Complete Setup</span>
                  <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;