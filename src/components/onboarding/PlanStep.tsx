import React from 'react';
import { Check } from 'lucide-react';
import { OnboardingData } from '../../types/onboarding';

interface PlanStepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

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

const PlanStep: React.FC<PlanStepProps> = ({ data, setData }) => {
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
};

export default PlanStep;