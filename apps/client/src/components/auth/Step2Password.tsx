// components/auth/registration-steps/Step2Password.tsx
"use client";
import FormField from "@/components/ui/formfield";
import Input from "@/components/ui/input";
import { motion } from "framer-motion";

interface Step2PasswordProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  passwordError?: string;
  confirmPasswordError?: string;
}

export default function Step2Password({ 
  password, 
  confirmPassword, 
  onPasswordChange, 
  onConfirmPasswordChange, 
  passwordError, 
  confirmPasswordError 
}: Step2PasswordProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <FormField label="Mot de passe" error={passwordError}>
        <Input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Créez un mot de passe sécurisé"
          showPasswordToggle
          className="lg:text-base text-lg lg:py-2 py-3"
        />
      </FormField>
      
      <FormField label="Confirmer le mot de passe" error={confirmPasswordError}>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          placeholder="Confirmez votre mot de passe"
          showPasswordToggle
          className="lg:text-base text-lg lg:py-2 py-3"
        />
      </FormField>
    </motion.div>
  );
}
