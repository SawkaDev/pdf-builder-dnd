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
    <div className="h-full p-6">
      <h2 className="text-2xl font-bold mb-8">Components</h2>
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

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Button
      ref={setNodeRef}
      style={style}
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
