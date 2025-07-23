// types/management.ts

import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface ActionButton {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick: (id: string) => void;
  icon?: React.ReactNode;
}

export interface StatsCard {
  value: string | number;
  label: string;
  icon: ReactNode;
  bgColor?: string;
  textColor?: string;
  iconBgColor?: string;
}

// ✅ Nouvelle interface pour les widgets personnalisés
export interface CustomWidget<T extends Record<string, any> = any> {
  id: string; // Identifiant unique
  title?: string;
  component: ReactNode | ((data: T[], isLoading?: boolean) => ReactNode); // Composant ou fonction qui reçoit les données et l'état de loading
  position: 'top' | 'bottom' | 'left' | 'right'; // Position par rapport au tableau
  size?: 'small' | 'medium' | 'large' | 'full'; // Taille du widget
  className?: string; // Classes CSS supplémentaires
  order?: number; // Ordre d'affichage (pour plusieurs widgets dans la même position)
  showWhen?: (data: T[], isLoading?: boolean) => boolean; // Condition d'affichage
}

export interface ManagementPageConfig<T extends Record<string, any> = any> {
  title: string;

  useDataHook: () => {
    data: T[] | undefined;
    isLoading: boolean;
    isFetching?: boolean;
    error?: unknown;
    refetch?: () => void;
  };

  columns: ColumnDef<T>[];
  actions?: ActionButton[];
  stats?: StatsCard[];
  
  // ✅ Nouveaux widgets personnalisés
  widgets?: CustomWidget<T>[];
  
  addNewButton?: {
    label: string;
    onClick: () => void;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
  filters?: {
    key: string;
    label: string;
    options: { value: string; label: string }[];
  }[];

  readOnly?: boolean;
  onViewDetails?: (item: T) => void;
}