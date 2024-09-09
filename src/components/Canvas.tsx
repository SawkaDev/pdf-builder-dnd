import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableComponent } from "./SortableComponent";
import { ComponentData } from "@/types";

interface CanvasProps {
  components: ComponentData[];
  setSelectedComponent: (component: ComponentData) => void;
  onCanvasClick: (event: React.MouseEvent) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  components,
  setSelectedComponent,
  onCanvasClick,
}) => {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  const isEmpty = components.length === 0;

  return (
    <div className="flex justify-center">
      <div
        ref={setNodeRef}
        className={`bg-white shadow-lg relative w-[1000px] ${
          isEmpty ? "h-[500px]" : "min-h-[500px]"
        }`}
        style={{ padding: "40px" }}
        onClick={onCanvasClick}
      >
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-3xl">
            Drag components here to start
          </div>
        ) : (
          <div>
            {components.map((component) => (
              <SortableComponent
                key={component.id}
                component={component}
                onClick={() => setSelectedComponent(component)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
