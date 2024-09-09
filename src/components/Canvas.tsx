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

  const isEmpty = components.length === 0;

  return (
    <div className="flex justify-center">
      <div
        ref={setNodeRef}
        className={`bg-white shadow-lg relative w-[1000px] ${
          isEmpty ? "h-[500px]" : "min-h-[500px]"
        }`}
        style={{ padding: "48px" }}
        onClick={onCanvasClick}
      >
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-2xl">
            Drag components here to start
          </div>
        ) : (
          <div className="space-y-3">
            {components.map((component) => (
              <React.Fragment key={component.id}>
                {insertionPoint === component.id && isDragging && (
                  <div className="h-0.5 bg-blue-500 w-full rounded-full" />
                )}
                <SortableTextComponent
                  component={component}
                  onClick={() => setSelectedComponent(component)}
                />
              </React.Fragment>
            ))}
            {isDragging && insertionPoint === null && components.length > 0 && (
              <div className="h-0.5 bg-blue-500 w-full rounded-full" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
