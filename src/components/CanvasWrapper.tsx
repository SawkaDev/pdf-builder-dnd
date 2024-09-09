import React, { useState } from "react";
import { useDndMonitor } from "@dnd-kit/core";
import { Canvas } from "./Canvas";
import { ComponentData } from "@/types";

interface CanvasWrapperProps {
  components: ComponentData[];
  setSelectedComponent: (component: ComponentData) => void;
  onCanvasClick: (event: React.MouseEvent) => void;
}

export const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  components,
  setSelectedComponent,
  onCanvasClick,
}) => {
  const [insertionPoint, setInsertionPoint] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useDndMonitor({
    onDragStart: () => {
      setIsDragging(true);
    },
    onDragMove: (event) => {
      const { over } = event;
      if (over && over.id !== "canvas") {
        setInsertionPoint(over.id as string);
      } else {
        setInsertionPoint(null);
      }
    },
    onDragEnd: () => {
      setInsertionPoint(null);
      setIsDragging(false);
    },
    onDragCancel: () => {
      setInsertionPoint(null);
      setIsDragging(false);
    },
  });

  const wrappedComponents = components.map((component) => ({
    ...component,
    isInsertionPoint: component.id === insertionPoint,
  }));

  return (
    <Canvas
      components={wrappedComponents}
      setSelectedComponent={setSelectedComponent}
      onCanvasClick={onCanvasClick}
    />
  );
};
