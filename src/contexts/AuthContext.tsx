import React, { createContext, useContext, useState, ReactNode } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔐 LOGIN (Firebase)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.email || "User",
        email: firebaseUser.email || "",
        role: email.includes("admin") ? "admin" : "student",
      });

    } catch (error) {
      throw new Error("Invalid email or password");
    }
    setIsLoading(false);
  };

  // 🆕 SIGNUP (Firebase)
  const signup = async (data: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email || "",
        data.password
      );

      const firebaseUser = userCredential.user;

      setUser({
        id: firebaseUser.uid,
        name: data.name || "User",
        email: data.email || "",
        role: "student",
        mobile: data.mobile,
        parentMobile: data.parentMobile,
        address: data.address,
        roomNumber: "TBA",
      });

    } catch (error) {
      throw new Error("Signup failed");
    }
    setIsLoading(false);
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
