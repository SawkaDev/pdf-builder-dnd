// src/components/Canvas.tsx

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableTextComponent } from "./SortableTextComponent";
import { ComponentData } from "@/types";

interface CanvasProps {
  components: ComponentData[];
  setSelectedComponent: (component: ComponentData) => void;
  onCanvasClick: (event: React.MouseEvent) => void;
  insertionPoint: string | null;
  isDragging: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({
  components,
  setSelectedComponent,
  onCanvasClick,
  insertionPoint,
  isDragging,
}) => {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-white p-4 min-h-full"
      onClick={onCanvasClick}
    >
      <h2 className="text-lg font-bold mb-4">Report Canvas</h2>
      <div className="space-y-2">
        {components.map((component) => (
          <React.Fragment key={component.id}>
            {insertionPoint === component.id && (
              <div className="h-1 bg-blue-500 w-full rounded-full my-2" />
            )}
            <SortableTextComponent
              component={component}
              onClick={() => setSelectedComponent(component)}
            />
          </React.Fragment>
        ))}
        {isDragging && insertionPoint === null && components.length > 0 && (
          <div className="h-1 bg-blue-500 w-full rounded-full my-2" />
        )}
      </div>
    </div>
  );
};
