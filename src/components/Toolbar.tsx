import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "./ui/button";
import { TextComponentData } from "@/types";
import { Type } from "lucide-react";

const draggableTextComponent: TextComponentData = {
  type: "text",
  content: "New Paragraph",
  size: "p",
  isMultiline: true,
  id: "text-component",
};

export const Toolbar: React.FC = () => {
  return (
    <div className="h-full bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Components</h2>
      <DraggableComponent component={draggableTextComponent} />
    </div>
  );
};

const DraggableComponent: React.FC<{ component: TextComponentData }> = ({
  component,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.id,
    data: component,
  });

  return (
    <Button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      variant="outline"
      className="w-full justify-start text-sm"
    >
      <Type className="mr-2 h-4 w-4" />
      {component.content}
    </Button>
  );
};
