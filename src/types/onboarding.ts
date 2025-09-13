export interface OnboardingData {
  name: string;
  birthday: string;
  addresses: Array<{ street: string; city: string; state: string; zip: string }>;
  emails: string[];
  phones: string[];
  relatives: Array<{ name: string; relationship: string }>;
  companies: Array<{ name: string; role: string }>;
  plan: string;
}