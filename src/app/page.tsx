"use client";

import React, { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Toolbar } from "@/components/Toolbar";
import { Canvas } from "@/components/Canvas";
import { Sidebar } from "@/components/Sidebar";
import { ComponentData } from "@/types";
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

  const handleDragStart = (event: DragEndEvent) => {
    const { active } = event;
    if (active.id === "text-component") {
      setActiveComponent(active.data.current as ComponentData);
    } else {
      const draggedComponent = components.find((c) => c.id === active.id);
      if (draggedComponent) {
        setActiveComponent(draggedComponent);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === "text-component" && over && over.id === "canvas") {
      const newComponent = {
        ...(active.data.current as ComponentData),
        id: uuidv4(),
      };
      setComponents([...components, newComponent]);
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

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <main className="flex h-screen overflow-hidden">
        <div className="flex-none w-64 h-full overflow-y-auto">
          <Toolbar />
        </div>
        <div className="flex-grow overflow-auto">
          <SortableContext
            items={components.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <Canvas
              components={components}
              setSelectedComponent={setSelectedComponent}
              onCanvasClick={handleCanvasClick}
            />
          </SortableContext>
        </div>
        <div className="flex-none w-64 h-full overflow-y-auto">
          <Sidebar
            selectedComponent={selectedComponent}
            updateComponent={updateComponent}
          />
        </div>
        <DragOverlay>
          {activeComponent && (
            <TextComponent component={activeComponent} onClick={() => {}} />
          )}
        </DragOverlay>
      </main>
    </DndContext>
  );
};

export default Home;
