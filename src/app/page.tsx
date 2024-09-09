"use client";

import React, { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Toolbar } from "@/components/Toolbar";
import { CanvasWrapper } from "@/components/CanvasWrapper";
import { Sidebar } from "@/components/Sidebar";
import { ComponentData, TextComponentData } from "@/types";
import { TextComponent } from "@/components/TextComponent";
import { v4 as uuidv4 } from "uuid";

const Home: React.FC = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentData | null>(null);
  const [activeComponent, setActiveComponent] = useState<ComponentData | null>(
    null
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveComponent(active.data.current as ComponentData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === "text-component" && over) {
      const newComponent: TextComponentData = {
        ...(active.data.current as TextComponentData),
        id: uuidv4(),
      };

      setComponents((prevComponents) => {
        if (over.id === "canvas") {
          return [...prevComponents, newComponent];
        } else {
          const overIndex = prevComponents.findIndex((c) => c.id === over.id);
          return [
            ...prevComponents.slice(0, overIndex),
            newComponent,
            ...prevComponents.slice(overIndex),
          ];
        }
      });
    } else if (over && active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveComponent(null);
  };

  const updateComponent = (updatedComponent: ComponentData) => {
    setComponents(
      components.map((c) =>
        c.id === updatedComponent.id ? updatedComponent : c
      )
    );
    setSelectedComponent(updatedComponent);
  };

  const handleCanvasClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setSelectedComponent(null);
    }
  }, []);

  const handleSave = () => {
    console.log("Current canvas state:", components);
  };

  const handleCancel = () => {
    setSelectedComponent(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <main className="flex h-screen overflow-hidden">
        <div className="flex-none w-80 h-full overflow-y-auto border-r border-gray-200 bg-gray-50">
          <Toolbar />
        </div>
        <div className="flex-grow overflow-auto bg-gray-100 p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Report Builder
          </h1>
          <SortableContext
            items={components.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <CanvasWrapper
              components={components}
              setSelectedComponent={setSelectedComponent}
              onCanvasClick={handleCanvasClick}
            />
          </SortableContext>
        </div>
        <div className="flex-none w-96 h-full overflow-hidden border-l border-gray-200 bg-gray-50">
          <Sidebar
            selectedComponent={selectedComponent}
            updateComponent={updateComponent}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </main>
      <DragOverlay>
        {activeComponent && (
          <div
            className="bg-white border rounded shadow-md"
            style={{ width: "250px", opacity: 0.8 }}
          >
            <TextComponent
              component={activeComponent}
              onClick={() => {}}
              isDragging={true}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Home;
