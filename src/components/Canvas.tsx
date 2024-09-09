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
    <div className="p-5 min-h-full bg-gray-100 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Report Template Builder</h2>
      <div
        ref={setNodeRef}
        className={`bg-white shadow-lg relative w-[21cm] ${
          isEmpty ? "h-[200px]" : ""
        }`}
        style={{
          paddingTop: "1.27cm",
          paddingBottom: "1.27cm",
          paddingLeft: "1.27cm",
          paddingRight: "1.27cm",
        }}
        onClick={onCanvasClick}
      >
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Drag components here to start
          </div>
        ) : (
          <div>
            {components.map((component, index) => (
              <React.Fragment key={component.id}>
                {insertionPoint === component.id && isDragging && (
                  <div className="h-1 bg-blue-500 w-full rounded-full" />
                )}
                <SortableTextComponent
                  component={component}
                  onClick={() => setSelectedComponent(component)}
                />
              </React.Fragment>
            ))}
            {isDragging && insertionPoint === null && components.length > 0 && (
              <div className="h-1 bg-blue-500 w-full rounded-full" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
