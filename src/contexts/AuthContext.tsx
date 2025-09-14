import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

interface User {
  id: string;
  email: string;
  name: string;
  memberUuid: string;
  hasCompletedOnboarding: boolean;
  isAdmin: boolean;
  plan: string;
  planExpiry: string;
  subscriptionStatus?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('remova_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('remova_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: _password,
      });

      if (error) throw error;

      if (data.user) {
        // Fetch subscription data with plan details
        const { data: subscriptionData } = await supabase
          .from('user_subscriptions')
          .select(`
            *,
            subscription_plans (
              name,
              description,
              price,
              interval,
              features,
              metadata
            )
          `)
          .eq('user_id', data.user.id)
          .in('status', ['active', 'trialing', 'past_due'])
          .order('created_at', { ascending: false })
          .single();

        const mockUser: User = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || email.split('@')[0],
          memberUuid: `member-${data.user.id}`,
          hasCompletedOnboarding: !!subscriptionData,
          isAdmin: email === 'admin@remova.io',
          plan: subscriptionData?.subscription_plans?.name || 'No Plan',
          planExpiry: subscriptionData?.current_period_end || '',
          subscriptionStatus: subscriptionData?.status || 'inactive'
        };
        
        setUser(mockUser);
        localStorage.setItem('remova_user', JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, _password: string, name: string) => {
    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password: _password,
        options: {
          data: {
            name: name
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        const mockUser: User = {
          id: data.user.id,
          email,
          name,
          memberUuid: `member-${data.user.id}`,
          hasCompletedOnboarding: false,
          isAdmin: false,
          plan: 'No Plan',
          planExpiry: '',
          subscriptionStatus: 'inactive'
        };
        
        setUser(mockUser);
        localStorage.setItem('remova_user', JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('remova_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('remova_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};