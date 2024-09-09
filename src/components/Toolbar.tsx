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
    <div className="h-full p-6">
      <h2 className="text-2xl font-bold mb-8">Components</h2>
      <DraggableComponent component={draggableTextComponent} />
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
      className="w-full justify-start text-lg py-6"
    >
      <Type className="mr-4 h-6 w-6" />
      {component.content}
    </Button>
  );
};
