import React from "react";
import { Menu } from "lucide-react";

interface SidebarContainerProps {
  children: React.ReactNode;
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ children }) => {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DC</span>
          </div>
          <span className="ml-3 text-lg font-semibold text-gray-900">DashCode</span>
        </div>
        <button className="ml-auto p-1 rounded-lg hover:bg-gray-100">
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-4">{children}</div>
    </div>
  );
};

export default SidebarContainer;
