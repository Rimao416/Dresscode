import React from "react";
import MenuItem from "./MenuItem";

interface SidebarSectionProps {
  title: string;
  items: any[];
  activeItem: string;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  setActiveItem: (name: string) => void;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  items,
  activeItem,
  expandedSections,
  toggleSection,
  setActiveItem,
}) => (
  <div className="mb-6">
    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">
      {title}
    </h3>
    <nav className="space-y-1">
      {items.map((item) => (
        <MenuItem
          key={item.name}
          item={item}
          activeItem={activeItem}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          setActiveItem={setActiveItem}
        />
      ))}
    </nav>
  </div>
);

export default SidebarSection;
