import React from 'react';
import PublicHeader from '../components/PublicHeader';

const DataProcessingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-3xl font-bold font-heading text-navy-900 mb-8">Data Processing Agreement</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8 font-body">
              Last updated: January 19, 2025
            </p>

            <h2 className="font-heading text-navy-900">Overview</h2>
            <p className="font-body">
              This Data Processing Agreement ("DPA") describes how Remova processes personal data 
              in accordance with applicable data protection laws, including GDPR and CCPA.
            </p>

            <h2 className="font-heading text-navy-900">Data Processing Activities</h2>
            <h3 className="font-heading text-navy-900">Purpose of Processing</h3>
            <p className="font-body">We process your personal data for the following purposes:</p>
            <ul>
              <li>Providing privacy protection services</li>
              <li>Scanning data broker websites</li>
              <li>Submitting removal requests</li>
              <li>Monitoring for new exposures</li>
              <li>Sending alerts and reports</li>
            </ul>

            <h3 className="font-heading text-navy-900">Legal Basis</h3>
            <p className="font-body">Our legal basis for processing includes:</p>
            <ul>
              <li>Contract performance (providing our services)</li>
              <li>Legitimate interests (fraud prevention, service improvement)</li>
              <li>Consent (marketing communications)</li>
              <li>Legal obligations (compliance with laws)</li>
            </ul>

            <h2 className="font-heading text-navy-900">Data Categories</h2>
            <h3 className="font-heading text-navy-900">Personal Data We Process</h3>
            <ul>
              <li>Identity data (name, date of birth)</li>
              <li>Contact data (email, phone, address)</li>
              <li>Technical data (IP address, browser type)</li>
              <li>Usage data (service interactions)</li>
              <li>Marketing data (preferences, communications)</li>
            </ul>

            <h3 className="font-heading text-navy-900">Special Categories</h3>
            <p className="font-body">
              We do not intentionally collect special categories of personal data (sensitive data) 
              unless specifically required for our services and with your explicit consent.
            </p>

            <h2 className="font-heading text-navy-900">Data Transfers</h2>
            <p className="font-body">
              Your data may be transferred to and processed in countries outside your jurisdiction. 
              We ensure appropriate safeguards are in place, including:
            </p>
            <ul>
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Adequacy decisions by relevant authorities</li>
              <li>Certification schemes and codes of conduct</li>
            </ul>

            <h2 className="font-heading text-navy-900">Data Retention</h2>
            <p className="font-body">We retain personal data for different periods depending on the purpose:</p>
            <ul>
              <li>Account data: Until account deletion + 30 days</li>
              <li>Service data: Duration of service + 1 year</li>
              <li>Legal compliance: As required by applicable laws</li>
              <li>Marketing data: Until consent withdrawal + 30 days</li>
            </ul>

            <h2 className="font-heading text-navy-900">Your Rights</h2>
            <p className="font-body">Under applicable data protection laws, you have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Erase your data ("right to be forgotten")</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Object to processing</li>
              <li>Withdraw consent</li>
            </ul>

            <h2 className="font-heading text-navy-900">Security Measures</h2>
            <p className="font-body">We implement appropriate technical and organizational measures including:</p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Access controls and authentication</li>
              <li>Regular security assessments</li>
              <li>Employee training and confidentiality agreements</li>
              <li>Incident response procedures</li>
            </ul>

            <h2 className="font-heading text-navy-900">Data Breach Notification</h2>
            <p className="font-body">
              In the event of a data breach, we will notify relevant authorities within 72 hours 
              and affected individuals without undue delay, as required by law.
            </p>

            <h2 className="font-heading text-navy-900">Contact Information</h2>
            <p className="font-body">
              For data protection inquiries, contact our Data Protection Officer:
            </p>
            <ul>
              <li>Email: dpo@remova.io</li>
              <li>Address: 123 Privacy Street, San Francisco, CA 94102</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataProcessingPage;