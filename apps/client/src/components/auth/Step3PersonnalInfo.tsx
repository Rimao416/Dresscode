// components/auth/registration-steps/Step3PersonalInfo.tsx
"use client";
import FormField from "@/components/ui/formfield";
import Input from "@/components/ui/input";
import { motion } from "framer-motion";
import { Gender } from "../../../app/generated/prisma";
interface Step3PersonalInfoProps {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender | "";
  acceptedTerms: boolean;
  acceptedMarketing: boolean;
  onFirstNameChange: (firstName: string) => void;
  onLastNameChange: (lastName: string) => void;
  onPhoneChange: (phone: string) => void;
  onDateOfBirthChange: (dateOfBirth: string) => void;
  onGenderChange: (gender: Gender | "") => void;
  onAcceptedTermsChange: (accepted: boolean) => void;
  onAcceptedMarketingChange: (accepted: boolean) => void;
  errors: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    acceptedTerms?: string;
  };
}

export default function Step3PersonalInfo({ 
  firstName,
  lastName,
  phone,
  dateOfBirth,
  gender,
  acceptedTerms,
  acceptedMarketing,
  onFirstNameChange,
  onLastNameChange,
  onPhoneChange,
  onDateOfBirthChange,
  onGenderChange,
  onAcceptedTermsChange,
  onAcceptedMarketingChange,
  errors
}: Step3PersonalInfoProps) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormField label="Prénom" error={errors.firstName}>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            placeholder="Votre prénom"
            className="lg:text-base text-lg lg:py-2 py-3"
          />
        </FormField>
        
        <FormField label="Nom" error={errors.lastName}>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            placeholder="Votre nom"
            className="lg:text-base text-lg lg:py-2 py-3"
          />
        </FormField>
      </div>
      
      <FormField label="Téléphone" error={errors.phone}>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Votre numéro de téléphone"
          className="lg:text-base text-lg lg:py-2 py-3"
        />
      </FormField>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormField label="Date de naissance (optionnel)">
          <Input
            type="date"
            value={dateOfBirth}
            onChange={(e) => onDateOfBirthChange(e.target.value)}
            className="lg:text-base text-lg lg:py-2 py-3"
          />
        </FormField>
        
        <FormField label="Genre (optionnel)">
          <select
            value={gender}
            onChange={(e) => onGenderChange(e.target.value as Gender)}
            className="w-full px-3 py-2 lg:py-2 lg:text-base text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Sélectionner</option>
            <option value="MALE">Homme</option>
            <option value="FEMALE">Femme</option>
            <option value="OTHER">Autre</option>
          </select>
        </FormField>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => onAcceptedTermsChange(e.target.checked)}
            className="mt-1 h-4 w-4 text-red-800 focus:ring-red-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="text-sm text-gray-600 leading-5">
            J&apos;accepte les{" "}
            <a href="#" className="text-red-800 hover:text-red-900 font-medium">
              conditions d&apos;utilisation
            </a>{" "}
            et la{" "}
            <a href="#" className="text-red-800 hover:text-red-900 font-medium">
              politique de confidentialité
            </a>
          </label>
        </div>
        
        {errors.acceptedTerms && (
          <p className="text-red-500 text-sm">{errors.acceptedTerms}</p>
        )}
        
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="marketing"
            checked={acceptedMarketing}
            onChange={(e) => onAcceptedMarketingChange(e.target.checked)}
            className="mt-1 h-4 w-4 text-red-800 focus:ring-red-500 border-gray-300 rounded"
          />
          <label htmlFor="marketing" className="text-sm text-gray-600 leading-5">
            Je souhaite recevoir des offres promotionnelles par email et SMS (optionnel)
          </label>
        </div>
      </div>
    </motion.div>
  );
}