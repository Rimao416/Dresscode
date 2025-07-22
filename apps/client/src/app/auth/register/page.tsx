// RegisterPage.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/button";
import StepIndicator from "@/components/auth/StepIndicator";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Gender } from "../../../../app/generated/prisma";

// Import des hooks
import { useRegistration } from "@/hooks/useRegistration";
import { useFormValidation } from "@/hooks/useFormValidation";


// Import des composants steps améliorés
import Step1Email from "@/components/auth/Step1Email";
import Step2Password from "@/components/auth/Step2Password";
import Step3PersonalInfo from "@/components/auth/Step3PersonnalInfo";
import Step4Address from "@/components/auth/Step4Address";
import { emailSchema, passwordSchema, personalInfoSchema, addressSchema, CompleteRegistrationData } from "@/schemas/auth.schema";



const STEPS = [
  { id: 1, title: "Email", description: "Vérification de votre adresse email" },
  { id: 2, title: "Mot de passe", description: "Sécurisation de votre compte" },
  { id: 3, title: "Informations", description: "Vos informations personnelles" },
  { id: 4, title: "Adresse", description: "Informations de livraison (optionnel)" },
];

export default function RegisterPage() {
  const {
    userData,
    updateUserData,
    loading,
    setLoading,
    currentStep,
    nextStep,
    previousStep,
    stepValidation,
    updateStepValidation,
  } = useAuth();

  // Hook pour l'inscription complète
  const { register, isRegistering, registrationError } = useRegistration();

  // Hooks de validation pour chaque étape
  const step1Validation = useFormValidation(emailSchema);
  const step2Validation = useFormValidation(passwordSchema);
  const step3Validation = useFormValidation(personalInfoSchema);
  const step4Validation = useFormValidation(addressSchema);

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return stepValidation.step1;
      case 2:
        return stepValidation.step2;
      case 3:
        return stepValidation.step3;
      case 4:
        return stepValidation.step4;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < 4) {
      if (canProceedToNextStep()) {
        nextStep();
      }
    } else {
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      previousStep();
    }
  };

  const handleSkipStep4 = async () => {
    await handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Préparer les données pour l'inscription
      const registrationData: CompleteRegistrationData = {
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword || '',
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        acceptedTerms: userData.acceptedTerms,
        acceptedMarketing: userData.acceptedMarketing,
        country: userData.country || 'France',
        address: userData.address,
        postalCode: userData.postalCode,
        city: userData.city,
        addressComplement: userData.addressComplement,
      };

      const success = await register(registrationData);
      
      if (success) {
        // Redirection ou message de succès
        console.log('Inscription réussie !');
        // router.push('/auth/success') ou autre logique
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Email
            email={userData.email}
            onEmailChange={(email) => updateUserData("email", email)}
            onValidationChange={(isValid) => updateStepValidation('step1', isValid)}
          />
        );
        
      case 2:
        return (
          <Step2Password
            password={userData.password}
            confirmPassword={userData.confirmPassword || ""}
            onPasswordChange={(password) => updateUserData("password", password)}
            onConfirmPasswordChange={(confirmPassword) => updateUserData("confirmPassword", confirmPassword)}
            onValidationChange={(isValid) => updateStepValidation('step2', isValid)}
          />
        );
        
      case 3:
        return (
          <Step3PersonalInfo
            firstName={userData.firstName}
            lastName={userData.lastName}
            phone={userData.phone}
            dateOfBirth={userData.dateOfBirth || ""}
            gender={userData.gender || ""}
            acceptedTerms={userData.acceptedTerms}
            acceptedMarketing={userData.acceptedMarketing}
            onFirstNameChange={(firstName) => updateUserData("firstName", firstName)}
            onLastNameChange={(lastName) => updateUserData("lastName", lastName)}
            onPhoneChange={(phone) => updateUserData("phone", phone)}
            onDateOfBirthChange={(dateOfBirth) => updateUserData("dateOfBirth", dateOfBirth)}
            onGenderChange={(gender) => updateUserData("gender", gender as Gender)}
            onAcceptedTermsChange={(accepted) => updateUserData("acceptedTerms", accepted)}
            onAcceptedMarketingChange={(accepted) => updateUserData("acceptedMarketing", accepted)}
            onValidationChange={(isValid) => updateStepValidation('step3', isValid)}
          />
        );
        
      case 4:
        return (
          <Step4Address
            country={userData.country || "France"}
            address={userData.address || ""}
            postalCode={userData.postalCode || ""}
            city={userData.city || ""}
            addressComplement={userData.addressComplement || ""}
            onCountryChange={(country) => updateUserData("country", country)}
            onAddressChange={(address) => updateUserData("address", address)}
            onPostalCodeChange={(postalCode) => updateUserData("postalCode", postalCode)}
            onCityChange={(city) => updateUserData("city", city)}
            onAddressComplementChange={(complement) => updateUserData("addressComplement", complement)}
            onValidationChange={(isValid) => updateStepValidation('step4', isValid)}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <AuthLayout
      title="Créez votre"
      subtitle="compte !"
      description="Rejoignez notre communauté et découvrez nos plus beaux bouquets"
      ctaText="Créer un compte"
      heroTitle="Rejoignez-nous"
      heroSubtitle="et créez des moments magiques"
      heroDescription="Inscrivez-vous pour accéder à notre collection exclusive, bénéficier de conseils personnalisés et être les premiers informés de nos nouveautés."
    >
      <div className="space-y-8">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
       
        {registrationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{registrationError}</p>
          </div>
        )}
       
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>
       
        <div className="flex justify-between space-x-4">
          {currentStep > 1 && (
            <Button
              onClick={handlePrevious}
              variant="secondary"
              className="lg:text-base text-lg lg:py-2 py-3"
              disabled={loading || isRegistering}
            >
              Précédent
            </Button>
          )}
          
          <div className="flex-1" />
          
          {currentStep === 4 && (
            <Button
              onClick={handleSkipStep4}
              variant="secondary"
              className="lg:text-base text-lg lg:py-2 py-3"
              disabled={loading || isRegistering}
            >
              Passer cette étape
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            variant="primary"
            loading={loading || isRegistering}
            disabled={!canProceedToNextStep()}
            className="lg:text-base text-lg lg:py-2 py-3"
          >
            {currentStep === 4
              ? (loading || isRegistering)
                ? "Création du compte..."
                : "Créer mon compte"
              : (loading || isRegistering)
                ? "Vérification..."
                : "Continuer"}
          </Button>
        </div>
      </div>
     
      {currentStep === 1 && (
        <div className="text-center lg:mt-6 mt-4 lg:pt-0 pt-4 lg:border-0 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/auth/login"
              className="text-red-800 hover:text-red-900 font-semibold transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>
      )}
    </AuthLayout>
  );
}