import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  memberUuid: string;
  hasCompletedOnboarding: boolean;
  isAdmin: boolean;
  plan: 'personal' | 'family' | 'group' | 'business';
  planExpiry: string;
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

  const login = async (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      memberUuid: `member-${Date.now()}`,
      hasCompletedOnboarding: Math.random() > 0.5,
      isAdmin: email === 'admin@remova.io',
      plan: 'personal',
      planExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    setUser(mockUser);
    localStorage.setItem('remova_user', JSON.stringify(mockUser));
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      email,
      name,
      memberUuid: `member-${Date.now()}`,
      hasCompletedOnboarding: false,
      isAdmin: false,
      plan: 'personal',
      planExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    setUser(mockUser);
    localStorage.setItem('remova_user', JSON.stringify(mockUser));
  };

  const logout = () => {
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