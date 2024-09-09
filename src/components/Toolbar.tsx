import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "./ui/button";
import { TextComponentData } from "@/types";
import { Type } from "lucide-react";

const draggableTextComponent: TextComponentData = {
  type: "text",
  content: "Text",
  size: "p",
  isMultiline: true,
  id: "text-component",
};

export const Toolbar: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
          Components
        </h2>
        <div className="space-y-3">
          <DraggableComponent component={draggableTextComponent} />
        </div>
      </div>
    </div>
  );
};

const DraggableComponent: React.FC<{ component: TextComponentData }> = ({
  component,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: component.id,
    data: component,
  });

  return (
    <Button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      variant="outline"
      className="w-full justify-start text-base py-3 px-4 bg-white hover:bg-gray-100 transition-colors duration-200"
    >
      <Type className="mr-3 h-5 w-5" />
      {component.content}
    </Button>
  );
};
