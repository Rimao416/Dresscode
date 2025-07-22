"use client";
import React, { useState } from "react";
import {
  Home,
  MessageSquare,
  Mail,
  Layout,
  Calendar,
  CheckSquare,
  Folder,
  Key,
  Wrench,
} from "lucide-react";
import SidebarContainer from "@/components/sidebar/SidebarContainer";
import SidebarSection from "@/components/sidebar/SidebarSection";

const DashCodeSidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedSections, setExpandedSections] = useState({
    Dashboard: true,
    Authentication: false,
    Utility: false,
    Projects: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const mainItems = [
    {
      name: "Dashboard",
      icon: Home,
      hasSubmenu: true,
      submenu: [
        { name: "Analytics Dashboard" },
        { name: "Ecommerce Dashboard" },
        { name: "Project Dashboard" },
        { name: "CRM Dashboard" },
        { name: "Banking Dashboard" },
      ],
    },
  ];

  const appsItems = [
    { name: "Chat", icon: MessageSquare },
    { name: "Email", icon: Mail },
    { name: "Kanban", icon: Layout },
    { name: "Calendar", icon: Calendar },
    { name: "Todo", icon: CheckSquare },
    {
      name: "Projects",
      icon: Folder,
      hasSubmenu: true,
      submenu: [],
    },
  ];

  const pagesItems = [
    {
      name: "Authentication",
      icon: Key,
      hasSubmenu: true,
      submenu: [],
    },
    {
      name: "Utility",
      icon: Wrench,
      hasSubmenu: true,
      submenu: [],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarContainer>
        <SidebarSection
          title="MENU"
          items={mainItems}
          activeItem={activeItem}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          setActiveItem={setActiveItem}
        />
        <SidebarSection
          title="APPS"
          items={appsItems}
          activeItem={activeItem}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          setActiveItem={setActiveItem}
        />
        <SidebarSection
          title="PAGES"
          items={pagesItems}
          activeItem={activeItem}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          setActiveItem={setActiveItem}
        />
      </SidebarContainer>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 p-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Sidebar exacte créée
          </h2>
          <p className="text-gray-600">
            La sidebar correspond maintenant exactement à l'image fournie avec
            les sections expandables et le style approprié.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashCodeSidebar;
