import React from "react";
import { ComponentData } from "@/types";
import TextConfiguration from "./TextConfiguration";
import TableConfiguration from "./TableConfiguration";
import SpacerConfiguration from "./SpacerConfiguration";
import HeaderConfiguration from "./HeaderConfiguration";

export interface SidebarProps {
  selectedComponent: ComponentData | null;
  updateComponent: (updatedComponent: ComponentData) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedComponent,
  updateComponent,
  onSave,
  onCancel,
  onDelete,
}) => {
  if (!selectedComponent) {
    return (
      <div className="h-full p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
          Component Configuration
        </h2>
        <p className="text-lg">Select or add a component to edit.</p>
      </div>
    );
  }

  if (selectedComponent.type === "text") {
    return (
      <TextConfiguration
        onCancel={onCancel}
        onDelete={onDelete}
        updateComponent={updateComponent}
        selectedComponent={selectedComponent}
        onSave={onSave}
      />
    );
  }

  if (selectedComponent.type === "header") {
    return (
      <HeaderConfiguration
        onCancel={onCancel}
        onDelete={onDelete}
        updateComponent={updateComponent}
        selectedComponent={selectedComponent}
        onSave={onSave}
      />
    );
  }

  if (selectedComponent.type === "table") {
    return (
      <TableConfiguration
        onCancel={onCancel}
        onDelete={onDelete}
        updateComponent={updateComponent}
        selectedComponent={selectedComponent}
        onSave={onSave}
      />
    );
  }

  if (selectedComponent.type === "spacer") {
    return (
      <SpacerConfiguration
        onCancel={onCancel}
        onDelete={onDelete}
        updateComponent={updateComponent}
        selectedComponent={selectedComponent}
        onSave={onSave}
      />
    );
  }

  return null;
};
