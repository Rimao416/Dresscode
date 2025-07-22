"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Gender } from '../../app/generated/prisma';

// Types basés sur le schema Prisma
export interface UserData {
  // Authentication information
  email: string;
  password: string;
  confirmPassword?: string; // Pour le register uniquement
  
  // Personal information (step 3)
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: string;
  gender?: Gender;
  
  // User preferences
  acceptedTerms: boolean;
  acceptedMarketing: boolean;
  
  // Address (step 4 - optional)
  country?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  addressComplement?: string;
}

export interface AuthContextType {
  // User data
  userData: UserData;
  updateUserData: (field: keyof UserData, value: string | boolean) => void;
  resetUserData: () => void;
  
  // Loading states
  loading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Errors
  errors: Record<string, string>;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;
  
  // Current step for multi-step forms
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  
}

const initialUserData: UserData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  phone: '',
  dateOfBirth: '',
  gender: Gender.MALE,
  acceptedTerms: false,
  acceptedMarketing: false,
  country: 'France',
  address: '',
  postalCode: '',
  city: '',
  addressComplement: '',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState<number>(1);

  const updateUserData = (field: keyof UserData, value: string | boolean) => {
    setUserData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user updates field
    if (errors[field]) {
      clearError(field);
    }
  };

  const resetUserData = () => {
    setUserData(initialUserData);
    setCurrentStep(1);
    clearAllErrors();
  };

  const setError = (field: string, error: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));
  };

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };



  const value: AuthContextType = {
    userData,
    updateUserData,
    resetUserData,
    loading,
    setLoading,
    errors,
    setError,
    clearError,
    clearAllErrors,
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};