import { useState, useCallback } from 'react';
import { authService } from '../services/authService';
import { completeRegistrationSchema, CompleteRegistrationData } from '../schemas/authSchemas';
import { useFormValidation } from './useFormValidation';

export interface UseRegistrationReturn {
  register: (userData: CompleteRegistrationData) => Promise<boolean>;
  isRegistering: boolean;
  registrationError: string | null;
  validate: (data: CompleteRegistrationData) => boolean;
  errors: Record<string, string>;
  clearErrors: () => void;
}

export const useRegistration = (): UseRegistrationReturn => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  
  const { validate, errors, clearAllErrors, setFieldError } = useFormValidation(completeRegistrationSchema);

  const register = useCallback(async (userData: CompleteRegistrationData): Promise<boolean> => {
    setRegistrationError(null);
    
    // Validation des données
    if (!validate(userData)) {
      return false;
    }

    setIsRegistering(true);
    try {
      const result = await authService.register(userData);
      
      if (result.success) {
        clearAllErrors();
        return true;
      } else {
        setRegistrationError(result.message || 'Erreur lors de l\'inscription');
        
        // Gestion des erreurs de champs spécifiques
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, error]) => {
            setFieldError(field, error);
          });
        }
        
        return false;
      }
    } catch (error) {
      setRegistrationError('Une erreur inattendue est survenue');
      return false;
    } finally {
      setIsRegistering(false);
    }
  }, [validate, clearAllErrors, setFieldError]);

  return {
    register,
    isRegistering,
    registrationError,
    validate,
    errors,
    clearErrors: clearAllErrors
  };
};
