import PublicHeader from '../components/PublicHeader';

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-3xl font-bold font-heading text-navy-900 mb-8">Accessibility Statement</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8 font-body">
              Last updated: January 19, 2025
            </p>

            <h2 className="font-heading text-navy-900">Our Commitment to Accessibility</h2>
            <p className="font-body">
              At Remova, we are committed to ensuring that our privacy protection platform is accessible to all users, 
              including those with disabilities. We strive to provide an inclusive digital experience that meets or 
              exceeds accessibility standards.
            </p>

            <h2 className="font-heading text-navy-900">Accessibility Standards</h2>
            <p className="font-body">
              Our platform aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
              These guidelines help make web content more accessible to people with disabilities, including:
            </p>
            <ul>
              <li>Visual impairments (blindness, low vision, color blindness)</li>
              <li>Hearing impairments</li>
              <li>Motor impairments</li>
              <li>Cognitive disabilities</li>
            </ul>

            <h2 className="font-heading text-navy-900">Accessibility Features</h2>
            <p className="font-body">We have implemented the following accessibility features:</p>
            <ul>
              <li>Keyboard navigation support for all interactive elements</li>
              <li>Screen reader compatibility with proper ARIA labels and landmarks</li>
              <li>High contrast color schemes that meet WCAG contrast requirements</li>
              <li>Resizable text that scales up to 200% without loss of functionality</li>
              <li>Alternative text for all meaningful images</li>
              <li>Clear focus indicators for keyboard users</li>
              <li>Consistent navigation and page structure</li>
              <li>Error identification and suggestions for form inputs</li>
            </ul>

            <h2 className="font-heading text-navy-900">Ongoing Efforts</h2>
            <p className="font-body">
              We continuously work to improve the accessibility of our platform through:
            </p>
            <ul>
              <li>Regular accessibility audits and testing</li>
              <li>User testing with people who have disabilities</li>
              <li>Staff training on accessibility best practices</li>
              <li>Incorporating accessibility considerations into our design and development process</li>
            </ul>

            <h2 className="font-heading text-navy-900">Feedback and Support</h2>
            <p className="font-body">
              We welcome feedback about the accessibility of our platform. If you encounter any accessibility 
              barriers or have suggestions for improvement, please contact us:
            </p>
            <ul>
              <li>Email: accessibility@remova.io</li>
              <li>Phone: 1-800-REMOVA-1 (1-800-736-6821)</li>
              <li>Mail: Remova Accessibility Team, 123 Privacy Street, San Francisco, CA 94102</li>
            </ul>

            <h2 className="font-heading text-navy-900">Third-Party Content</h2>
            <p className="font-body">
              Some content on our platform may be provided by third parties. While we strive to ensure all 
              content meets our accessibility standards, we cannot guarantee the accessibility of third-party 
              content. We work with our partners to improve accessibility where possible.
            </p>

            <h2 className="font-heading text-navy-900">Assistive Technologies</h2>
            <p className="font-body">
              Our platform is designed to be compatible with assistive technologies, including:
            </p>
            <ul>
              <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
              <li>Voice recognition software</li>
              <li>Keyboard navigation tools</li>
              <li>Switch navigation devices</li>
              <li>Magnification software</li>
            </ul>

            <h2 className="font-heading text-navy-900">Updates to This Statement</h2>
            <p className="font-body">
              We may update this accessibility statement from time to time to reflect changes to our platform 
              or accessibility improvements. We will notify users of any significant changes through our 
              standard communication channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;