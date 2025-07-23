// components/common/ManagementPage.tsx
import React from 'react';
import { ManagementPageConfig, CustomWidget } from '@/types/management.type';
import GenericErrorBoundary from './GenericErrorBoundary';
import { StatCard } from './StatCard';
import { DataTable } from './Datatable';

interface ManagementPageProps<T extends Record<string, any> = any> {
  config: ManagementPageConfig<T>;
}

const ManagementPage = <T extends Record<string, any> = any>({ config }: ManagementPageProps<T>) => {
  const {
    data,
    isLoading,
  } = config.useDataHook();

  // ✅ Handlers corrigés pour correspondre aux types attendus par DataTable
  const handleEdit = (id: number) => {
    if (config.actions) {
      const editAction = config.actions.find(action => action.label === 'Edit');
      if (editAction) {
        editAction.onClick(id.toString());
      }
    }
  };

  const handleDelete = (id: number) => {
    if (config.actions) {
      const deleteAction = config.actions.find(action => action.label === 'Delete');
      if (deleteAction) {
        deleteAction.onClick(id.toString());
      }
    }
  };

  // Convertir les filtres
  const filterOptions = config.filters?.map(filter => ({
    label: filter.label,
    columnId: filter.key,
    type: 'select' as const,
    options: filter.options,
    position: 'dropdown' as const,
  })) || [];

  // ✅ Fonction pour rendre les widgets
  const renderWidget = (widget: CustomWidget<T>) => {
    // Vérifier la condition d'affichage
    if (widget.showWhen && !widget.showWhen(data || [], isLoading)) {
      return null;
    }

    const content = typeof widget.component === 'function'
      ? widget.component(data || [], isLoading)
      : widget.component;

    // Classes de taille
    const sizeClasses = {
      small: 'col-span-1',
      medium: 'col-span-2',
      large: 'col-span-3',
      full: 'col-span-full'
    };

    return (
      <div
        key={widget.id}
        className={`
          ${sizeClasses[widget.size || 'medium']}
          ${widget.className || ''}
        `}
        style={{ order: widget.order || 0 }}
      >
        {widget.title && (
          <h3 className="text-lg font-medium mb-4">{widget.title}</h3>
        )}
        {content}
      </div>
    );
  };

  // ✅ Filtrer et trier les widgets par position
  const getWidgetsByPosition = (position: 'top' | 'bottom' | 'left' | 'right') => {
    return config.widgets
      ?.filter(widget => widget.position === position)
      ?.sort((a, b) => (a.order || 0) - (b.order || 0)) || [];
  };

  const topWidgets = getWidgetsByPosition('top');
  const bottomWidgets = getWidgetsByPosition('bottom');
  const leftWidgets = getWidgetsByPosition('left');
  const rightWidgets = getWidgetsByPosition('right');

  return (
    <GenericErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3 sm:gap-0">
          <h1 className="text-lg sm:text-xl font-medium">{config.title}</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            {config.secondaryButton && (
              <button
                onClick={config.secondaryButton.onClick}
                className="px-4 py-2 border border-brand-500 text-brand-500 rounded-lg hover:bg-brand-50 transition-colors"
              >
                {config.secondaryButton.label}
              </button>
            )}
            {config.addNewButton && (
              <button
                onClick={config.addNewButton.onClick}
                className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-500 transition-colors"
              >
                {config.addNewButton.label}
              </button>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        {config.stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {config.stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                bgColor={stat.bgColor}
                textColor={stat.textColor}
                iconBgColor={stat.iconBgColor}
              />
            ))}
          </div>
        )}

        {/* ✅ Widgets TOP */}
        {topWidgets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {topWidgets.map(renderWidget)}
          </div>
        )}

        {/* Layout principal avec sidebars */}
        <div className="grid grid-cols-12 gap-6">
          {/* ✅ Widgets LEFT */}
          {leftWidgets.length > 0 && (
            <div className="col-span-12 lg:col-span-3 space-y-6">
              {leftWidgets.map(renderWidget)}
            </div>
          )}

          {/* Datatable */}
          <div className={`
            col-span-12
            ${leftWidgets.length > 0 && rightWidgets.length > 0 ? 'lg:col-span-6' :
              leftWidgets.length > 0 || rightWidgets.length > 0 ? 'lg:col-span-9' : ''}
          `}>
            <div className="bg-white rounded-lg shadow">
              <DataTable<T>
                data={data || []}
                columns={config.columns}
                title={config.title}
                loading={isLoading}
                onEdit={config.actions?.some(a => a.label === 'Edit') ? handleEdit : undefined}
                onDelete={config.actions?.some(a => a.label === 'Delete') ? handleDelete : undefined}
                filterOptions={filterOptions}
                keyExtractor={(item) => (item as any).id}
                readOnly={config.readOnly}
                onViewDetails={config.onViewDetails}
              />
            </div>
          </div>

          {/* ✅ Widgets RIGHT */}
          {rightWidgets.length > 0 && (
            <div className="col-span-12 lg:col-span-3 space-y-6">
              {rightWidgets.map(renderWidget)}
            </div>
          )}
        </div>

        {/* ✅ Widgets BOTTOM */}
        {bottomWidgets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {bottomWidgets.map(renderWidget)}
          </div>
        )}
      </div>
    </GenericErrorBoundary>
  );
};

export default ManagementPage;