import React from 'react';
import { OnboardingData } from '../../types/onboarding';

interface RelativesStepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const RelativesStep: React.FC<RelativesStepProps> = ({ data, setData }) => {
  const addItem = () => {
    setData((prev: OnboardingData) => ({
      ...prev,
      relatives: [...prev.relatives, { name: '', relationship: '' }]
    }));
  };

  const removeItem = (index: number) => {
    setData((prev: OnboardingData) => ({
      ...prev,
      relatives: prev.relatives.filter((_, i: number) => i !== index)
    }));
  };

  const updateItem = (index: number, value: { name: string; relationship: string }) => {
    setData((prev: OnboardingData) => ({
      ...prev,
      relatives: prev.relatives.map((item, i: number) => i === index ? value : item)
    }));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Adding family members and close associates can help us find more data broker records (optional).
      </p>
      {data.relatives.map((relative: { name: string; relationship: string }, index: number) => (
        <div key={index} className="p-4 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-slate-900">Relative {index + 1}</h4>
            {data.relatives.length > 1 && (
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
              placeholder="Full Name"
              value={relative.name}
              onChange={(e) => updateItem(index, { ...relative, name: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select
              value={relative.relationship}
              onChange={(e) => updateItem(index, { ...relative, relationship: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Relationship</option>
              <option value="spouse">Spouse</option>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
              <option value="sibling">Sibling</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="text-primary-600 hover:text-primary-700 font-medium"
      >
        + Add Another Relative
      </button>
    </div>
  );
};

export default RelativesStep;