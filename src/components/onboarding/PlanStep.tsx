import React, { useState, useEffect } from 'react';
import { Check, Star, Users, Shield } from 'lucide-react';
import { OnboardingData } from '../../types/onboarding';
import { supabase } from '../../integrations/supabase/client';
import LoadingSkeleton from '../LoadingSkeleton';

interface PlanStepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  stripePriceId: string;
  originalPrice: number;
  seats?: number;
  tier: string;
  savings?: string;
  popular?: boolean;
}

const PlanStep: React.FC<PlanStepProps> = ({ data, setData }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanType, setSelectedPlanType] = useState<'individual' | 'family' | 'team'>('individual');

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const { data: plansData, error } = await supabase.functions.invoke('get-stripe-plans', {
          body: { type: selectedPlanType }
        });
        
        if (error) {
          throw error;
        }

        // Mark the middle plan as popular
        const plansWithPopular = plansData.map((plan: Plan, index: number) => ({
          ...plan,
          popular: index === 1 // Make the second plan (Family) popular
        }));

        setPlans(plansWithPopular);
      } catch (err: any) {
        console.error('Error fetching plans:', err);
        setError('Failed to load subscription plans');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [selectedPlanType]);

  const planTypes = [
    { 
      id: 'individual' as const, 
      label: 'Individual', 
      icon: Shield, 
      description: 'Personal protection plans' 
    },
    { 
      id: 'family' as const, 
      label: 'Family', 
      icon: Users, 
      description: 'Protect your whole family' 
    },
    { 
      id: 'team' as const, 
      label: 'Team', 
      icon: Star, 
      description: 'Business & organizations' 
    }
  ];
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold font-heading text-navy-900 mb-2">Choose Your Protection Plan</h3>
          <p className="text-slate-600">Loading subscription plans...</p>
        </div>
        <LoadingSkeleton type="card" count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold font-heading text-navy-900 mb-2">Choose Your Protection Plan</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-red-700 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold font-heading text-navy-900 mb-2">Choose Your Protection Plan</h3>
        <p className="text-slate-600 mb-6">Select the plan that best fits your privacy needs</p>
        
        {/* Plan Type Selector */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-slate-100 rounded-lg p-1 space-x-1">
            {planTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedPlanType(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    selectedPlanType === type.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className={`grid gap-6 ${plans.length > 2 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
              data.plan === plan.id
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-primary-300'
            }`}
            onClick={() => setData({ ...data, plan: plan.stripePriceId })}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-alert-500 to-alert-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                  Most Popular
                </span>
              </div>
            )}

            {plan.savings && (
              <div className="absolute -top-2 -right-2">
                <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Save {plan.savings}
                </span>
              </div>
            )}
            
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-semibold font-heading text-navy-900">{plan.name}</h4>
                  {plan.seats && plan.seats > 1 && (
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                      {plan.seats} {plan.seats === 1 ? 'person' : 'people'}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-navy-900 mb-4">{plan.price}{plan.period}</p>
                <p className="text-slate-600 mb-6">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <Check className="h-4 w-4 text-success-500 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                data.plan === plan.stripePriceId ? 'border-primary-500 bg-primary-500' : 'border-slate-300'
              }`}>
                {data.plan === plan.stripePriceId && <Check className="h-4 w-4 text-white" />}
              </div>
            </div>

            {/* Plan tier badge */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                {plan.tier?.replace('_', ' ')} tier
              </span>
              {data.plan === plan.stripePriceId && (
                <span className="text-xs text-primary-600 font-medium">Selected</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {plans.length === 0 && !isLoading && !error && (
        <div className="text-center p-8 bg-slate-50 border border-slate-200 rounded-lg">
          <p className="text-slate-600">No plans available for {selectedPlanType} accounts.</p>
        </div>
      )}
    </div>
  );
};

export default PlanStep;