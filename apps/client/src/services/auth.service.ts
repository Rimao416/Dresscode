import { CompleteRegistrationData } from "@/schemas/auth.schema";

export interface EmailCheckResponse {
  exists: boolean;
  message?: string;
}

export interface RegistrationResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  message?: string;
  errors?: Record<string, string>;
}

class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  async checkEmailExists(email: string): Promise<EmailCheckResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la vérification de l\'email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking email:', error);
      return {
        exists: false,
        message: 'Erreur lors de la vérification de l\'email'
      };
    }
  }

  async register(userData: CompleteRegistrationData): Promise<RegistrationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Erreur lors de l\'inscription',
          errors: data.errors
        };
      }

      return {
        success: true,
        user: data.user,
        message: 'Compte créé avec succès'
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Erreur lors de l\'inscription'
      };
    }
  }
}

export const authService = new AuthService();