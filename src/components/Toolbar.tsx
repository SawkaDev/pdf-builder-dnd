import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "./ui/button";
import { TextComponentData } from "@/types";

const draggableTextComponent: TextComponentData = {
  type: "text",
  content: "New Text",
  size: "p",
  isMultiline: true,
  id: "text-component",
};

export const Toolbar: React.FC = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "text-component",
    data: draggableTextComponent,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div className="h-full bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Component Toolbar</h2>
      <Button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        Add Text Component
      </Button>
    </div>
  );
};
