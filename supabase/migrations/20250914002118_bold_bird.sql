/*
  # Create subscriptions and plans tables

  1. New Tables
    - `subscription_plans`
      - `id` (text, primary key) - Stripe Price ID
      - `stripe_product_id` (text) - Stripe Product ID
      - `name` (text) - Plan display name
      - `description` (text) - Plan description
      - `price` (integer) - Price in cents
      - `currency` (text) - Currency code
      - `interval` (text) - billing interval
      - `features` (jsonb) - Plan features array
      - `active` (boolean) - Whether plan is active
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `stripe_customer_id` (text) - Stripe customer ID
      - `stripe_subscription_id` (text) - Stripe subscription ID
      - `plan_id` (text, foreign key to subscription_plans)
      - `status` (text) - active, cancelled, past_due, etc.
      - `current_period_start` (timestamp)
      - `current_period_end` (timestamp)
      - `cancel_at_period_end` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id text PRIMARY KEY, -- Stripe Price ID
  stripe_product_id text NOT NULL,
  name text NOT NULL,
  description text,
  price integer NOT NULL, -- Price in cents
  currency text NOT NULL DEFAULT 'usd',
  interval text NOT NULL DEFAULT 'year', -- month, year
  features jsonb DEFAULT '[]'::jsonb,
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
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_plans (public read)
CREATE POLICY "Anyone can read active plans"
  ON subscription_plans
  FOR SELECT
  USING (active = true);

-- Policies for user_subscriptions (users can only see their own)
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

-- Insert sample plans (these should match your Stripe products)
INSERT INTO subscription_plans (id, stripe_product_id, name, description, price, features) VALUES
('price_personal_yearly', 'prod_personal', 'Personal', 'Perfect for individuals', 2000, '["Unlimited scans of data brokers", "Automated opt-out & removal requests", "Exposure dashboard with statistics", "Monthly privacy status reports"]'::jsonb),
('price_family_yearly', 'prod_family', 'Family', 'Up to 3 people', 4500, '["Everything in Personal Plan", "Covers up to 3 family members", "Shared family dashboard", "Individual privacy profiles", "Centralized notifications"]'::jsonb),
('price_group_yearly', 'prod_group', 'Group', 'Up to 5 people', 6500, '["Everything in Family Plan", "Covers up to 5 people", "Centralized billing & management", "20% discount on group add-ons", "Priority support"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  features = EXCLUDED.features,
  updated_at = now();