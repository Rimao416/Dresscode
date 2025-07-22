"use client";
import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface MenuItemProps {
  item: {
    name: string;
    icon?: React.ElementType;
    hasSubmenu?: boolean;
    submenu?: any[];
  };
  isSubmenuItem?: boolean;
  activeItem: string;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  setActiveItem: (name: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isSubmenuItem = false,
  activeItem,
  expandedSections,
  toggleSection,
  setActiveItem,
}) => {
  const handleClick = () => {
    if (item.hasSubmenu) {
      toggleSection(item.name);
    } else {
      setActiveItem(item.name);
    }
  };

  const isActive = activeItem === item.name && !item.hasSubmenu;
  const isExpanded = expandedSections[item.name];

  return (
    <div className="relative">
      {/* Active indicator bar */}
      {isActive && (
        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-slate-900 rounded-l-full shadow-sm"></div>
      )}
      
      <button
        onClick={handleClick}
        className={`group relative w-full flex items-center justify-between px-5 py-3.5 text-[13px] font-medium transition-all duration-300 ease-out overflow-hidden ${
          isActive
            ? "bg-slate-50/80 text-slate-900 shadow-sm backdrop-blur-sm"
            : isSubmenuItem
            ? "text-slate-500 hover:text-slate-700 hover:bg-slate-50/50 pl-12"
            : "text-slate-600 hover:bg-slate-50/70 hover:text-slate-800"
        }`}
      >

        
        <div className="flex items-center">
          {item.icon && (
            <div className="relative">
              <item.icon
                className={`mr-4 h-4 w-4 transition-all duration-300 ease-out ${
                  isActive
                    ? "text-slate-800 drop-shadow-sm"
                    : isSubmenuItem
                    ? "text-slate-400 group-hover:text-slate-600"
                    : "text-slate-500 group-hover:text-slate-700"
                }`}
              />
              {isActive && (
                <div className="absolute inset-0 bg-slate-200/30 rounded-full blur-sm -z-10 scale-150"></div>
              )}
            </div>
          )}
          
          {isSubmenuItem && !item.icon && (
            <div className="mr-4 h-4 w-4 flex items-center justify-center">
              <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                isActive ? "bg-slate-900" : "bg-slate-400"
              }`}></div>
            </div>
          )}
          
          <span className={`tracking-[-0.01em] transition-all duration-300 ease-out ${
            isActive 
              ? "font-semibold text-slate-900 drop-shadow-sm" 
              : "font-medium"
          }`}>
            {item.name}
          </span>
        </div>
                
        {item.hasSubmenu && (
          <div className="relative z-10">
            <div className={`transition-all duration-300 ease-out ${
              isExpanded ? "rotate-0" : "rotate-0"
            } ${isActive ? "drop-shadow-sm" : ""}`}>
              {isExpanded ? (
                <ChevronDown className={`h-3.5 w-3.5 transition-all duration-300 ease-out ${
                  isActive 
                    ? "text-slate-600" 
                    : "text-slate-400 group-hover:text-slate-600 group-hover:scale-110"
                }`} />
              ) : (
                <ChevronRight className={`h-3.5 w-3.5 transition-all duration-300 ease-out ${
                  isActive 
                    ? "text-slate-600" 
                    : "text-slate-400 group-hover:text-slate-600 group-hover:scale-110"
                }`} />
              )}
            </div>
          </div>
        )}
      </button>
      
      {item.hasSubmenu && isExpanded && item.submenu?.length > 0 && (
        <div className="relative">
            {/* Submenu container with enhanced styling */}
          <div className="bg-slate-25 border-l border-slate-100">
            
            {item.submenu.map((subItem, index) => (
              <div 
                key={subItem.name}
                className="relative"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideIn 0.3s ease-out forwards'
                }}
              >
                <MenuItem
                  item={subItem}
                  isSubmenuItem={true}
                  activeItem={activeItem}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  setActiveItem={setActiveItem}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MenuItem;