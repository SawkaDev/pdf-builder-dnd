import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { ComponentData } from "@/types";
import { SortableComponent } from "../drag-components/SortableComponent";

interface CanvasProps {
  components: ComponentData[];
  setSelectedComponent: (component: ComponentData) => void;
  onCanvasClick: (event: React.MouseEvent) => void;
  isDragging: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({
  components,
  setSelectedComponent,
  onCanvasClick,
  isDragging,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  return (
    <div className="flex justify-center">
      <div
        ref={setNodeRef}
        className="bg-white shadow-lg relative w-[1000px] flex flex-col"
        style={{ padding: "40px" }}
        onClick={onCanvasClick}
      >
        <div className="flex-grow">
          {components.map((component) => (
            <SortableComponent
              key={component.id}
              component={component}
              onClick={() => setSelectedComponent(component)}
            />
          ))}
        </div>
        <div
          className={`h-16 mt-4 flex items-center justify-center text-gray-400 text-xl border-2 border-dashed transition-colors ${
            isOver && isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }`}
        >
          Drop here to add to the bottom
        </div>
      </div>
    </div>
  );
};
