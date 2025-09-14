import React from 'react';
import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  popular?: boolean;
}

const PlanStep: React.FC<PlanStepProps> = ({ data, setData }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data: plansData, error } = await supabase.functions.invoke('get-stripe-plans');
        
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
  }, []);

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
        </div>
      </div>
    );
  }

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
            onClick={() => setData({ ...data, plan: plan.stripePriceId })}
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
                <p className="text-2xl font-bold text-navy-900 mb-4">{plan.price}{plan.period}</p>
                <p className="text-slate-600 mb-4">{plan.description}</p>
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
                data.plan === plan.stripePriceId ? 'border-primary-500 bg-primary-500' : 'border-slate-300'
              }`}>
                {data.plan === plan.stripePriceId && <Check className="h-4 w-4 text-white" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanStep;