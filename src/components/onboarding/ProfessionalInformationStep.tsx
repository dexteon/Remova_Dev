import React from 'react';
import { OnboardingData } from '../../types/onboarding';

interface ProfessionalInformationStepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const ProfessionalInformationStep: React.FC<ProfessionalInformationStepProps> = ({ data, setData }) => {
  const addItem = () => {
    setData((prev: OnboardingData) => ({
      ...prev,
      companies: [...prev.companies, { name: '', role: '' }]
    }));
  };

  const removeItem = (index: number) => {
    setData((prev: OnboardingData) => ({
      ...prev,
      companies: prev.companies.filter((_, i: number) => i !== index)
    }));
  };

  const updateItem = (index: number, value: { name: string; role: string }) => {
    setData((prev: OnboardingData) => ({
      ...prev,
      companies: prev.companies.map((item, i: number) => i === index ? value : item)
    }));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Professional information can help identify additional data exposure (optional).
      </p>
      {data.companies.map((company: { name: string; role: string }, index: number) => (
        <div key={index} className="p-4 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-slate-900">Company {index + 1}</h4>
            {data.companies.length > 1 && (
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              value={company.name}
              onChange={(e) => updateItem(index, { ...company, name: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="Your Role/Title"
              value={company.role}
              onChange={(e) => updateItem(index, { ...company, role: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="text-primary-600 hover:text-primary-700 font-medium"
      >
        + Add Another Company
      </button>
    </div>
  );
};

export default ProfessionalInformationStep;