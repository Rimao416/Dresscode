import { emailSchema } from '@/schemas/auth.schema';
import { authService } from '@/services/auth.service';
import { useState, useCallback } from 'react';
export interface UseEmailValidationReturn {
  checkEmail: (email: string) => Promise<{ isValid: boolean; error?: string; exists?: boolean }>;
  isChecking: boolean;
  lastCheckedEmail: string | null;
}

export const useEmailValidation = (): UseEmailValidationReturn => {
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckedEmail, setLastCheckedEmail] = useState<string | null>(null);

  const checkEmail = useCallback(async (email: string) => {
    if (!email.trim()) {
      return { isValid: false, error: "L'adresse email est obligatoire" };
    }

    // Validation Zod d'abord
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      return {
        isValid: false,
        error: validation.error.errors[0]?.message || "Email invalide"
      };
    }

    // Vérification de l'existence en base
    setIsChecking(true);
    try {
      const result = await authService.checkEmailExists(email);
      setLastCheckedEmail(email);
      
      if (result.exists) {
        return {
          isValid: false,
          error: "Cette adresse email est déjà utilisée",
          exists: true
        };
      }

      return { isValid: true };
    } catch (error) {
      return {
        isValid: false,
        error: "Erreur lors de la vérification de l'email"
      };
    } finally {
      setIsChecking(false);
    }
  }, []);

  return {
    checkEmail,
    isChecking,
    lastCheckedEmail
  };
};
