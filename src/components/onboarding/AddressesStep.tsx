import React from 'react';
import { OnboardingData } from '../../types/onboarding';

interface AddressesStepProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

const AddressesStep: React.FC<AddressesStepProps> = ({ data, setData }) => {
  const addItem = () => {
    setData((prev: OnboardingData) => ({
      ...prev,
      addresses: [...prev.addresses, { street: '', city: '', state: '', zip: '' }]
    }));
  };

  const removeItem = (index: number) => {
    setData((prev: OnboardingData) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i: number) => i !== index)
    }));
  };

  const updateItem = (index: number, value: { street: string; city: string; state: string; zip: string }) => {
    setData((prev: OnboardingData) => ({
      ...prev,
      addresses: prev.addresses.map((item: any, i: number) => i === index ? value : item)
    }));
  };

  return (
    <div className="space-y-4">
      {data.addresses.map((address: { street: string; city: string; state: string; zip: string }, index: number) => (
        <div key={index} className="p-4 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-slate-900">Address {index + 1}</h4>
            {data.addresses.length > 1 && (
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
              placeholder="Street Address"
              value={address.street}
              onChange={(e) => updateItem(index, { ...address, street: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => updateItem(index, { ...address, city: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) => updateItem(index, { ...address, state: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={address.zip}
              onChange={(e) => updateItem(index, { ...address, zip: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="text-primary-600 hover:text-primary-700 font-medium"
      >
        + Add Another Address
      </button>
    </div>
  );
};

export default AddressesStep;