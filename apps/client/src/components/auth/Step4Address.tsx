// components/auth/registration-steps/Step4Address.tsx
"use client";
import FormField from "@/components/ui/formfield";
import Input from "@/components/ui/input";
import { motion } from "framer-motion";

interface Step4AddressProps {
  country: string;
  address: string;
  postalCode: string;
  city: string;
  addressComplement: string;
  onCountryChange: (country: string) => void;
  onAddressChange: (address: string) => void;
  onPostalCodeChange: (postalCode: string) => void;
  onCityChange: (city: string) => void;
  onAddressComplementChange: (complement: string) => void;
}

export default function Step4Address({ 
  country,
  address,
  postalCode,
  city,
  addressComplement,
  onCountryChange,
  onAddressChange,
  onPostalCodeChange,
  onCityChange,
  onAddressComplementChange
}: Step4AddressProps) {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-sm">
          Cette étape est optionnelle. Vous pourrez ajouter votre adresse plus
          tard dans votre profil.
        </p>
      </div>
      
      <FormField label="Pays">
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="w-full px-3 py-2 lg:py-2 lg:text-base text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="France">France</option>
          <option value="Belgique">Belgique</option>
          <option value="Suisse">Suisse</option>
          <option value="Canada">Canada</option>
        </select>
      </FormField>
      
      <FormField label="Adresse">
        <Input
          type="text"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="123 rue de la Paix"
          className="lg:text-base text-lg lg:py-2 py-3"
        />
      </FormField>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormField label="Code postal">
          <Input
            type="text"
            value={postalCode}
            onChange={(e) => onPostalCodeChange(e.target.value)}
            placeholder="75001"
            className="lg:text-base text-lg lg:py-2 py-3"
          />
        </FormField>
        
        <FormField label="Ville">
          <Input
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="Paris"
            className="lg:text-base text-lg lg:py-2 py-3"
          />
        </FormField>
      </div>
      
      <FormField label="Complément d'adresse (optionnel)">
        <Input
          type="text"
          value={addressComplement}
          onChange={(e) => onAddressComplementChange(e.target.value)}
          placeholder="Appartement, étage, digicode..."
          className="lg:text-base text-lg lg:py-2 py-3"
        />
      </FormField>
    </motion.div>
  );
}