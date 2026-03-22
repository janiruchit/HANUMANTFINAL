import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roomNumber?: string;
  mobile?: string;
  parentMobile?: string;
  address?: string;
  aadhaarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
};

const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin@hanumant.com': {
    id: '1',
    name: 'Admin',
    email: 'admin@hanumant.com',
    role: 'admin',
    password: 'H@numant2290',
  },
  'rahul@student.com': {
    id: '2',
    name: 'Rahul Sharma',
    email: 'rahul@student.com',
    role: 'student',
    roomNumber: '204',
    mobile: '9876543210',
    parentMobile: '9876543211',
    address: 'Pune, Maharashtra',
    password: 'student123',
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const found = MOCK_USERS[email];
    if (found && found.password === password) {
      const { password: _, ...userData } = found;
      setUser(userData);
    } else {
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  const signup = async (data: Partial<User> & { password: string }) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name || '',
      email: data.email || '',
      role: 'student',
      mobile: data.mobile,
      parentMobile: data.parentMobile,
      address: data.address,
      roomNumber: 'TBA',
    };
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
