// Toolbar.tsx
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "./ui/button";
import {
  TextComponentData,
  TableComponentData,
  SpacerComponentData,
} from "@/types";
import { Type, Table, ArrowUpDown } from "lucide-react";

const draggableTextComponent: TextComponentData = {
  type: "text",
  content: "Text",
  size: "p",
  isMultiline: true,
  id: "text-component",
};

const draggableTableComponent: TableComponentData = {
  type: "table",
  id: "table-component",
  columns: [],
  rows: [],
};

const draggableSpacerComponent: SpacerComponentData = {
  type: "spacer",
  id: "spacer-component",
  height: 20,
};

const components = [
  { ...draggableTextComponent, label: "Text", icon: Type },
  { ...draggableTableComponent, label: "Table", icon: Table },
  { ...draggableSpacerComponent, label: "Spacer", icon: ArrowUpDown },
];

export const Toolbar: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
          Components
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {components.map((component) => (
            <DraggableComponent key={component.id} component={component} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DraggableComponent: React.FC<{
  component: (TextComponentData | TableComponentData | SpacerComponentData) & {
    label: string;
    icon: React.ElementType;
  };
}> = ({ component }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: component.id,
    data: component,
  });

  const Icon = component.icon;

  return (
    <Button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      variant="outline"
      className="w-full h-24 flex flex-col items-center justify-center text-sm bg-white hover:bg-gray-100 transition-colors duration-200 border-2 border-gray-200 rounded-lg shadow-sm"
    >
      <Icon className="h-8 w-8 mb-2" />
      {component.label}
    </Button>
  );
};
