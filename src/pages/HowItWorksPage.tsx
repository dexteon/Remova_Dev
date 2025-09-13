import { Search, Trash2, Eye, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';

const HowItWorksPage = () => {
  const steps = [
    {
      number: '1',
      title: 'Consultation',
      description: 'Tell us what might be exposed - we\'ll guide you through a simple intake process.',
      details: [
        'Quick 5-minute onboarding form',
        'Share basic information like name, email, and addresses',
        'Optional: Add family members for comprehensive protection',
        'All data is encrypted and securely stored',
      ],
      icon: Search,
    },
    {
      number: '2',
      title: 'Data Tracking',
      description: 'We scan data broker sites and beyond, using advanced algorithms to find your information.',
      details: [
        'Automated scanning of 200+ data broker websites',
        'Deep web and public record searches',
        'Cross-reference with known breach databases',
        'AI-powered matching to find variations of your data',
      ],
      icon: Search,
    },
    {
      number: '3',
      title: 'Erasure',
      description: 'We file removals and track proof, handling all the paperwork and follow-ups.',
      details: [
        'Professional opt-out requests submitted on your behalf',
        'Legal compliance with data protection regulations',
        'Before and after screenshots for verification',
        'Persistent follow-ups until removal is confirmed',
      ],
      icon: Trash2,
    },
    {
      number: '4',
      title: 'Protection',
      description: 'We monitor and keep you updated with ongoing scans and instant alerts.',
      details: [
        'Continuous monitoring for new exposures',
        'Instant alerts when new data is found',
        'Monthly privacy status reports',
        'Proactive protection against future breaches',
      ],
      icon: Eye,
    },
  ];

  const benefits = [
    {
      title: 'Save Time',
      description: 'No more spending hours filling out opt-out forms. We handle everything for you.',
      icon: CheckCircle,
    },
    {
      title: 'Professional Results',
      description: 'Our legal team ensures proper removal requests that data brokers take seriously.',
      icon: Shield,
    },
    {
      title: 'Ongoing Protection',
      description: 'Set it and forget it. We continuously monitor and protect your privacy.',
      icon: Eye,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-navy-900 mb-4">
            How Remova Works
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 font-body">
            Our proven four-step process ensures comprehensive protection for your digital identity. 
            From discovery to removal to ongoing monitoring.
          </p>
          <Link
            to="/register"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Start Your Free Scan</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;
              
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={isEven ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-alert-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold font-heading text-navy-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed font-body">{step.description}</p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-success-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 font-body">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={isEven ? 'lg:col-start-1' : ''}>
                    <div className="bg-gradient-to-br from-primary-100 to-success-100 rounded-xl p-8 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <Icon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold font-heading text-navy-900">Step {step.number}</h4>
                        <p className="text-slate-600 font-body">{step.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-900 mb-4">
              Why Choose Professional Removal?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-body">
              DIY data removal is time-consuming and often ineffective. Here's why our professional service gets better results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
                  <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-success-600" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading text-navy-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-body">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-success-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
            Ready to Start Your Privacy Protection?
          </h2>
          <p className="text-xl text-primary-100 mb-8 font-body">
            Join thousands who trust Remova to find, remove, and monitor their data exposures.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-slate-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Start Free Scan</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/pricing"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>View Pricing</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;