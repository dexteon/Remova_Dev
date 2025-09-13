import React from 'react';
import { OnboardingData } from '../../types/onboarding';

interface PersonalInformationStepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
        <input
          type="date"
          value={data.birthday}
          onChange={(e) => setData({ ...data, birthday: e.target.value })}
          className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );
};

export default PersonalInformationStep;