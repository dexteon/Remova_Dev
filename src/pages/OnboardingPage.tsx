import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, ArrowLeft, Check, MapPin, Mail, Users, Building, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { OnboardingData } from '../types/onboarding';

import PersonalInformationStep from '../components/onboarding/PersonalInformationStep';
import AddressesStep from '../components/onboarding/AddressesStep';
import ContactInformationStep from '../components/onboarding/ContactInformationStep';
import RelativesStep from '../components/onboarding/RelativesStep';
import ProfessionalInformationStep from '../components/onboarding/ProfessionalInformationStep';
import PlanStep from '../components/onboarding/PlanStep';

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
      component: <PersonalInformationStep data={data} setData={setData} />,
    },
    {
      title: 'Addresses',
      description: 'Current and previous addresses help us find more records',
      icon: MapPin,
      component: <AddressesStep data={data} setData={setData} />,
    },
    {
      title: 'Contact Information',
      description: 'Emails and phone numbers to search for',
      icon: Mail,
      component: <ContactInformationStep data={data} setData={setData} />,
    },
    {
      title: 'Relatives & Associates',
      description: 'Family members and close associates (optional)',
      icon: Users,
      component: <RelativesStep data={data} setData={setData} />,
    },
    {
      title: 'Professional Information',
      description: 'Companies and roles (optional)',
      icon: Building,
      component: <ProfessionalInformationStep data={data} setData={setData} />,
    },
    {
      title: 'Choose Your Plan',
      description: 'Select the protection level that\'s right for you',
      icon: Shield,
      component: <PlanStep data={data} setData={setData} />,
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

          {steps[currentStep].component}

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