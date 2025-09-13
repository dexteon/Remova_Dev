import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';

const PricingPage = () => {
  const plans = [
    {
      id: 'personal',
      name: 'Personal',
      price: '$20',
      period: '/year',
      description: 'Perfect for individuals',
      features: [
        'Unlimited scans of data brokers',
        'Automated opt-out & removal requests',
        'Exposure dashboard with statistics',
        'Monthly privacy status reports',
      ],
      addOns: [
        { name: 'Dark Web Monitoring', price: '+$5/year' },
        { name: 'Breach Alerts SMS/Email', price: '+$3/year' },
        { name: 'Priority Removals (24h)', price: '+$10/year' },
      ],
    },
    {
      id: 'family',
      name: 'Family',
      price: '$45',
      period: '/year',
      description: 'Up to 3 people',
      popular: true,
      features: [
        'Everything in Personal Plan',
        'Covers up to 3 family members',
        'Shared family dashboard',
        'Individual privacy profiles',
        'Centralized notifications',
      ],
      addOns: [
        { name: 'Dark Web Monitoring', price: '+$5/year per person' },
        { name: 'Breach Alerts SMS/Email', price: '+$3/year per person' },
        { name: 'Priority Removals (24h)', price: '+$10/year per person' },
      ],
    },
    {
      id: 'group',
      name: 'Group',
      price: '$65',
      period: '/year',
      description: 'Up to 5 people',
      features: [
        'Everything in Family Plan',
        'Covers up to 5 people',
        'Centralized billing & management',
        '20% discount on group add-ons',
        'Priority support',
      ],
      addOns: [
        { name: 'Dark Web Monitoring', price: '+$4/year per person (20% off)' },
        { name: 'Breach Alerts SMS/Email', price: '+$2.40/year per person (20% off)' },
        { name: 'Priority Removals (24h)', price: '+$8/year per person (20% off)' },
      ],
    },
  ];

  const businessFeatures = [
    'Custom pricing per seat',
    'Bulk user onboarding',
    'Centralized compliance dashboard',
    'API access for integrations',
    'Dedicated support team',
    'Custom SLA agreements',
  ];

  const faqs = [
    {
      question: 'How long does the removal process take?',
      answer: 'Most data broker removals are completed within 7-30 days. We handle all the paperwork and follow-ups, and you\'ll receive confirmation when removals are verified.',
    },
    {
      question: 'What happens if new exposures are found?',
      answer: 'Our continuous monitoring automatically detects new exposures and submits removal requests. You\'ll be notified immediately when new data is found.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your protection will continue until the end of your current billing period.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with our service, contact support for a full refund.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-success-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-navy-900 mb-4">
            Choose Your Protection Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-body">
            Flexible annual plans designed to meet your specific privacy protection needs. 
            All plans include unlimited scans and professional removal services.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div key={plan.id} className={`relative bg-white p-8 rounded-xl shadow-sm border ${plan.popular ? 'border-alert-500 ring-2 ring-alert-500' : 'border-slate-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-alert-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold font-heading text-navy-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-4 font-body">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-navy-900">{plan.price}</span>
                    <span className="text-slate-500 ml-2">{plan.period}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-semibold font-heading text-navy-900 mb-4">Included Features:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-success-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700 font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold font-heading text-navy-900 mb-4">Available Add-ons:</h4>
                  <ul className="space-y-2">
                    {plan.addOns.map((addOn, index) => (
                      <li key={index} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 font-body">{addOn.name}</span>
                        <span className="font-medium text-navy-900">{addOn.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  to="/register"
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center block transition-colors ${
                    plan.popular
                      ? 'bg-alert-500 hover:bg-alert-600 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Business Plan */}
          <div className="bg-navy-900 text-white rounded-xl p-8 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold font-heading mb-2">Business / Organization Plan</h3>
              <p className="text-slate-300 font-body">Coming Soon - Custom solutions for teams and organizations</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold font-heading mb-4">Perfect for:</h4>
                <ul className="space-y-2 text-slate-300 font-body">
                  <li>• Small firms and agencies</li>
                  <li>• Community organizations</li>
                  <li>• Digital safety programs</li>
                  <li>• Employee privacy benefits</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold font-heading mb-4">Features:</h4>
                <ul className="space-y-2">
                  {businessFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success-400" />
                      <span className="text-sm text-slate-300 font-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-white text-navy-900 hover:bg-slate-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                Request Custom Quote
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-8 border-b border-slate-200">
              <h2 className="text-2xl font-bold font-heading text-navy-900 text-center">Frequently Asked Questions</h2>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-slate-200 last:border-b-0 pb-6 last:pb-0">
                    <h3 className="font-semibold font-heading text-navy-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed font-body">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-success-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
            Ready to Protect Your Privacy?
          </h2>
          <p className="text-xl text-primary-100 mb-8 font-body">
            Join thousands who trust Remova to find, remove, and monitor their data exposures.
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-600 hover:bg-slate-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Start Free Scan</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;