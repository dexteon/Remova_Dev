import PublicHeader from '../components/PublicHeader';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-3xl font-bold font-heading text-navy-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8 font-body">
              Last updated: January 19, 2025
            </p>

            <h2 className="font-heading text-navy-900">Agreement to Terms</h2>
            <p className="font-body">
              By accessing and using Remova's services, you agree to be bound by these Terms of Service 
              and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="font-heading text-navy-900">Description of Service</h2>
            <p className="font-body">
              Remova provides privacy protection services including:
            </p>
            <ul>
              <li>Scanning data broker websites for your personal information</li>
              <li>Submitting removal requests on your behalf</li>
              <li>Monitoring for new data exposures</li>
              <li>Providing reports and alerts about your privacy status</li>
            </ul>

            <h2 className="font-heading text-navy-900">User Responsibilities</h2>
            <p className="font-body">You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Keep your account credentials secure</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not interfere with our systems or services</li>
            </ul>

            <h2 className="font-heading text-navy-900">Service Limitations</h2>
            <p className="font-body">
              While we work diligently to remove your information, we cannot guarantee:
            </p>
            <ul>
              <li>Complete removal from all data brokers</li>
              <li>Specific timeframes for removal completion</li>
              <li>Prevention of all future data exposures</li>
            </ul>

            <h2 className="font-heading text-navy-900">Payment Terms</h2>
            <ul>
              <li>All plans are billed annually in advance</li>
              <li>Prices are subject to change with 30 days notice</li>
              <li>Refunds are available within 30 days of purchase</li>
              <li>Cancellation takes effect at the end of the billing period</li>
            </ul>

            <h2 className="font-heading text-navy-900">Intellectual Property</h2>
            <p className="font-body">
              All content, features, and functionality of our service are owned by Remova and are 
              protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="font-heading text-navy-900">Limitation of Liability</h2>
            <p className="font-body">
              Remova's liability is limited to the amount you paid for our services. We are not liable 
              for any indirect, incidental, or consequential damages.
            </p>

            <h2 className="font-heading text-navy-900">Termination</h2>
            <p className="font-body">
              We may terminate or suspend your account for violation of these terms. You may cancel 
              your account at any time through your account settings.
            </p>

            <h2 className="font-heading text-navy-900">Changes to Terms</h2>
            <p className="font-body">
              We may update these terms from time to time. We will notify you of any material changes 
              via email or through our service.
            </p>

            <h2 className="font-heading text-navy-900">Contact Information</h2>
            <p className="font-body">
              For questions about these Terms of Service, contact us at:
            </p>
            <ul>
              <li>Email: legal@remova.io</li>
              <li>Address: 123 Privacy Street, San Francisco, CA 94102</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;