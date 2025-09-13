import React from 'react';
import { OnboardingData } from '../../types/onboarding';

interface ContactInformationStepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const ContactInformationStep: React.FC<ContactInformationStepProps> = ({ data, setData }) => {
  const addEmail = () => setData((prev: OnboardingData) => ({ ...prev, emails: [...prev.emails, ''] }));
  const removeEmail = (index: number) => setData((prev: OnboardingData) => ({ ...prev, emails: prev.emails.filter((_: string, i: number) => i !== index) }));
  const updateEmail = (index: number, value: string) => setData((prev: OnboardingData) => ({ ...prev, emails: prev.emails.map((email: string, i: number) => i === index ? value : email) }));

  const addPhone = () => setData((prev: OnboardingData) => ({ ...prev, phones: [...prev.phones, ''] }));
  const removePhone = (index: number) => setData((prev: OnboardingData) => ({ ...prev, phones: prev.phones.filter((_: string, i: number) => i !== index) }));
  const updatePhone = (index: number, value: string) => setData((prev: OnboardingData) => ({ ...prev, phones: prev.phones.map((phone: string, i: number) => i === index ? value : phone) }));

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Email Addresses</label>
        {data.emails.map((email: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => updateEmail(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="email@example.com"
            />
            {data.emails.length > 1 && (
              <button
                onClick={() => removeEmail(index)}
                className="text-red-600 hover:text-red-700 px-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addEmail}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          + Add Another Email
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Numbers</label>
        {data.phones.map((phone: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => updatePhone(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="(555) 123-4567"
            />
            {data.phones.length > 1 && (
              <button
                onClick={() => removePhone(index)}
                className="text-red-600 hover:text-red-700 px-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addPhone}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          + Add Another Phone
        </button>
      </div>
    </div>
  );
};

export default ContactInformationStep;