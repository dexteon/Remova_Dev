/*
  # Remova Subscription Management Schema

  1. New Tables
    - `subscription_plans`
      - `id` (text, primary key) - Stripe Price ID
      - `stripe_product_id` (text) - Stripe Product ID
      - `name` (text) - Plan display name
      - `description` (text) - Plan description
      - `price` (integer) - Price in cents
      - `currency` (text) - Currency code
      - `interval` (text) - Billing interval
      - `features` (jsonb) - Plan features array
      - `metadata` (jsonb) - Optery integration metadata
      - `active` (boolean) - Plan availability
      
    - `user_subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References auth.users
      - `stripe_customer_id` (text) - Stripe customer ID
      - `stripe_subscription_id` (text, unique) - Stripe subscription ID
      - `plan_id` (text) - References subscription_plans
      - `status` (text) - Subscription status
      - `optery_member_uuid` (text) - Optery member UUID
      - `current_period_start` (timestamptz)
      - `current_period_end` (timestamptz)
      - `cancel_at_period_end` (boolean)
      
  2. Security
    - Enable RLS on both tables
    - Plans readable by public (for pricing page)
    - Subscriptions readable/writable by owner only
*/

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id text PRIMARY KEY, -- Stripe Price ID
  stripe_product_id text NOT NULL,
  name text NOT NULL,
  description text,
  price integer NOT NULL, -- Price in cents
  currency text NOT NULL DEFAULT 'usd',
  interval text NOT NULL DEFAULT 'year',
  features jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text UNIQUE,
  plan_id text REFERENCES subscription_plans(id),
  status text NOT NULL DEFAULT 'incomplete',
  optery_member_uuid text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_plans (public read for pricing page)
CREATE POLICY "Anyone can read active plans"
  ON subscription_plans
  FOR SELECT
  TO public
  USING (active = true);

-- Policies for user_subscriptions
CREATE POLICY "Users can read own subscription"
  ON user_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
  ON user_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON user_subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert Remova subscription plans
INSERT INTO subscription_plans (id, stripe_product_id, name, description, price, interval, features, metadata) VALUES
-- Personal Plans
('price_remova_personal_annual', 'prod_remova_personal', 'Personal Protection', 'Complete privacy protection for one individual', 2000, 'year', 
 '["Unlimited data broker scans", "Automated removal requests", "Monthly privacy reports", "Email support"]'::jsonb,
 '{"optery_plan_uuid": "10c3c604-5100-4bb6-a02c-5d511931b84f", "optery_term": "yearly", "seats": 1, "tier": "personal", "savings": "17%"}'::jsonb),

-- Extended Plans  
('price_remova_extended_annual', 'prod_remova_extended', 'Extended Protection', 'Enhanced protection with priority removals', 3500, 'year',
 '["Everything in Personal", "Priority 24h removals", "Dark web monitoring", "Phone & SMS support", "Quarterly detailed reports"]'::jsonb,
 '{"optery_plan_uuid": "8e88f2ce-8822-487f-9017-e75cded09a8a", "optery_term": "yearly", "seats": 1, "tier": "extended", "savings": "17%"}'::jsonb),

-- Ultimate Plans
('price_remova_ultimate_annual', 'prod_remova_ultimate', 'Ultimate Protection', 'Maximum protection with white-glove service', 5000, 'year',
 '["Everything in Extended", "White-glove concierge service", "Legal document assistance", "Identity theft insurance", "24/7 priority support"]'::jsonb,
 '{"optery_plan_uuid": "a7f5f8ce-7733-398e-8906-d64cc3da7925", "optery_term": "yearly", "seats": 1, "tier": "ultimate", "savings": "17%"}'::jsonb),

-- Family Plans
('price_remova_family_3_annual', 'prod_remova_family_3', 'Family Protection (3 Members)', 'Protect your entire household - up to 3 members', 4500, 'year',
 '["Personal plan for each member", "Shared family dashboard", "Bulk management tools", "Family breach alerts"]'::jsonb,
 '{"optery_plan_uuid": "10c3c604-5100-4bb6-a02c-5d511931b84f", "optery_term": "yearly", "seats": 3, "tier": "family", "group_tag_prefix": "family"}'::jsonb),

('price_remova_family_5_annual', 'prod_remova_family_5', 'Family Protection (5 Members)', 'Extended family protection - up to 5 members', 6500, 'year',
 '["Personal plan for each member", "Shared family dashboard", "Bulk management tools", "Family breach alerts", "Priority family support"]'::jsonb,
 '{"optery_plan_uuid": "10c3c604-5100-4bb6-a02c-5d511931b84f", "optery_term": "yearly", "seats": 5, "tier": "family_plus", "group_tag_prefix": "family"}'::jsonb),

-- Team Plans
('price_remova_team_10_annual', 'prod_remova_team_10', 'Team Protection (10 Members)', 'Small business protection - up to 10 team members', 12000, 'year',
 '["Extended plan for each member", "Admin dashboard", "Compliance reporting", "Bulk onboarding", "Dedicated account manager"]'::jsonb,
 '{"optery_plan_uuid": "8e88f2ce-8822-487f-9017-e75cded09a8a", "optery_term": "yearly", "seats": 10, "tier": "team", "group_tag_prefix": "team"}'::jsonb)

ON CONFLICT (id) DO NOTHING;