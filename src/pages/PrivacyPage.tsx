import React from 'react';
import PublicHeader from '../components/PublicHeader';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-3xl font-bold font-heading text-navy-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8 font-body">
              Last updated: January 19, 2025
            </p>

            <h2 className="font-heading text-navy-900">Introduction</h2>
            <p className="font-body">
              At Remova, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              and protect your personal information when you use our privacy protection services.
            </p>

            <h2 className="font-heading text-navy-900">Information We Collect</h2>
            <h3 className="font-heading text-navy-900">Information You Provide</h3>
            <ul>
              <li>Name, email address, and contact information</li>
              <li>Previous addresses and phone numbers</li>
              <li>Family member information (optional)</li>
              <li>Payment and billing information</li>
            </ul>

            <h3 className="font-heading text-navy-900">Information We Collect Automatically</h3>
            <ul>
              <li>Usage data and analytics</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2 className="font-heading text-navy-900">How We Use Your Information</h2>
            <p className="font-body">We use your information to:</p>
            <ul>
              <li>Provide our data removal and monitoring services</li>
              <li>Scan data broker websites for your information</li>
              <li>Submit removal requests on your behalf</li>
              <li>Send you updates about your privacy protection</li>
              <li>Improve our services and user experience</li>
            </ul>

            <h2 className="font-heading text-navy-900">Information Sharing</h2>
            <p className="font-body">
              We do not sell, rent, or share your personal information with third parties except:
            </p>
            <ul>
              <li>When necessary to provide our services (e.g., submitting removal requests)</li>
              <li>To comply with legal obligations</li>
              <li>With your explicit consent</li>
              <li>To protect our rights and safety</li>
            </ul>

            <h2 className="font-heading text-navy-900">Data Security</h2>
            <p className="font-body">
              We implement industry-standard security measures including:
            </p>
            <ul>
              <li>256-bit SSL encryption for all data transmission</li>
              <li>Encrypted storage of all personal information</li>
              <li>Regular security audits and penetration testing</li>
              <li>Limited access controls and employee training</li>
            </ul>

            <h2 className="font-heading text-navy-900">Your Rights</h2>
            <p className="font-body">You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="font-heading text-navy-900">Data Retention</h2>
            <p className="font-body">
              We retain your information only as long as necessary to provide our services or as required by law. 
              You can request deletion of your account and data at any time through your account settings.
            </p>

            <h2 className="font-heading text-navy-900">Contact Us</h2>
            <p className="font-body">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@remova.io</li>
              <li>Address: 123 Privacy Street, San Francisco, CA 94102</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;