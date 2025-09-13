import { Link } from 'react-router-dom';
import { Search, Trash2, Eye, Shield, ArrowRight, CheckCircle, Star, Play } from 'lucide-react';
import PublicHeader from '../components/PublicHeader';
import LiveBreachNews from '../components/LiveBreachNews';

const HomePage = () => {
  const benefits = [
    {
      icon: Search,
      title: 'Expert Detection',
      description: 'We pinpoint your exposures across the web and data brokers.',
    },
    {
      icon: Trash2,
      title: 'Swift Erasure',
      description: 'We handle tedious removals, so you don\'t have to.',
    },
    {
      icon: Eye,
      title: 'Ongoing Protection',
      description: 'New exposures? We\'ll alert you and act fast.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Consultation',
      description: 'Tell us what might be exposed.',
    },
    {
      number: '2',
      title: 'Data Tracking',
      description: 'We scan data broker sites and beyond.',
    },
    {
      number: '3',
      title: 'Erasure',
      description: 'We file removals and track proof.',
    },
    {
      number: '4',
      title: 'Protection',
      description: 'We monitor and keep you updated.',
    },
  ];

  const testimonials = [
    {
      name: 'John P.',
      content: 'Remova found dozens of listings with my home address and had them removed. I finally feel off the grid again.',
      rating: 5,
    },
    {
      name: 'Anna R.',
      content: 'The dashboard makes something scary feel manageable—and I love the ongoing alerts.',
      rating: 5,
    },
    {
      name: 'Sarah M.',
      content: 'Professional service with real results. My family\'s data is finally protected.',
      rating: 5,
    },
  ];

  const plans = [
    {
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
        'Dark Web Monitoring: +$5/year',
        'Breach Alerts SMS/Email: +$3/year',
        'Priority Removals (24h): +$10/year',
      ],
    },
    {
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
    },
    {
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
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-success-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23e2e8f0%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-navy-900 leading-tight mb-6">
              Erase your data.
              <br />
              <span className="text-primary-600">Reclaim your privacy.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed font-body">
              Remova finds your exposed data on the web, removes it, and keeps watch—so you can get back to living.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                to="/register"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Start Free Scan</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/how-it-works"
                className="border-2 border-slate-300 hover:border-slate-400 text-navy-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>See How It Works</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success-500" />
                <span>256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Remova Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-900 mb-4">
              Why Choose Remova?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're your vigilant detective dog for data protection—calm under pressure, laser-focused on removal results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold font-heading text-navy-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-body">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-900 mb-4">
              How Remova Works
            </h2>
            <p className="text-xl text-slate-600">
              Our proven four-step process ensures comprehensive protection for your digital identity.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-alert-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold font-heading text-navy-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed font-body">{step.description}</p>
                
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-slate-200 transform translate-x-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-900 mb-4">
              Real Stories, Real Protection
            </h2>
            <p className="text-xl text-slate-600">
              See how Remova has helped people regain control of their digital lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed font-body">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold font-heading text-navy-900">{testimonial.name}</p>
                  <p className="text-slate-500 text-sm">Verified Customer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Choose Your Protection Plan
            </h2>
            <p className="text-xl text-slate-300 font-body">
              Flexible annual plans designed to meet your specific privacy protection needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-slate-800 p-8 rounded-xl ${plan.popular ? 'ring-2 ring-alert-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-alert-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold font-heading mb-2">{plan.name}</h3>
                  <p className="text-slate-400 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-slate-400 ml-2">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.addOns && (
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Available Add-ons:</h4>
                    <ul className="space-y-2">
                      {plan.addOns.map((addOn, addOnIndex) => (
                        <li key={addOnIndex} className="text-xs text-slate-400 font-body">
                          {addOn}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Link
                  to="/register"
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center block transition-colors ${
                    plan.popular
                      ? 'bg-alert-500 hover:bg-alert-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/pricing"
              className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center space-x-1"
            >
              <span>View detailed pricing</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Breach News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy-900 mb-4">
              Stay Informed About Data Breaches
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real-time updates from trusted security sources help you understand the evolving threat landscape.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <LiveBreachNews autoRotate={true} showControls={true} maxItems={4} />
          </div>

          <div className="text-center mt-8">
            <Link
              to="/live-breach-news"
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center space-x-1"
            >
              <span>View all breach news</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-success-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
            Ready to Sniff Out Threats and Guard Your Digital World?
          </h2>
          <p className="text-xl text-primary-100 mb-8 font-body">
            Don't let data exposures control your life. Take the first step towards reclaiming your privacy and peace of mind.
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-600 hover:bg-slate-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Start Free Scan Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="mb-6">
                <div className="text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-8 w-8 text-primary-400" />
                    <span className="font-bold font-heading text-xl">Remova</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed font-body">
                Your vigilant detective dog for data protection. We find your exposed data on the web, 
                remove it professionally, and keep watch with ongoing monitoring.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-success-400" />
                  <span className="text-sm text-slate-400">GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-success-400" />
                  <span className="text-sm text-slate-400">SOC 2 Certified</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading mb-4">Services</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">Data Broker Removal</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Dark Web Monitoring</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Privacy Consulting</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Continuous Protection</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading mb-4">Legal & Support</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/data-processing" className="hover:text-white transition-colors">Data Processing</Link></li>
                <li><Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 Remova. All rights reserved. Your privacy is our priority.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;