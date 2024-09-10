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
import { ResizableSidebar } from "@/components/ResizableSidebar";
import {
  ComponentData,
  SpacerComponentData,
  TableComponentData,
  TextComponentData,
} from "@/types";
import { TextComponent } from "@/components/TextComponent";
import { v4 as uuidv4 } from "uuid";
import { TableComponent } from "@/components/TableComponent";
import { SpacerComponent } from "@/components/SpacerComponent";

const Home: React.FC = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentData | null>(null);
  const [activeComponent, setActiveComponent] = useState<ComponentData | null>(
    null
  );

  const handleDeleteComponent = (id: string) => {
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== id)
    );
    setSelectedComponent(null);
  };

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

    if (
      (active.id === "text-component" ||
        active.id === "table-component" ||
        active.id === "spacer-component") &&
      over
    ) {
      let newComponent: ComponentData;

      if (active.id === "text-component") {
        newComponent = {
          ...(active.data.current as TextComponentData),
          id: uuidv4(),
        };
      } else if (active.id === "spacer-component") {
        newComponent = {
          ...(active.data.current as SpacerComponentData),
          id: uuidv4(),
          height: 20, // Default height
        };
      } else {
        newComponent = {
          ...(active.data.current as TableComponentData),
          id: uuidv4(),
          columns: [],
          rows: [],
        };
      }

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
    setLastSaved(new Date());
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
        <div className="flex-grow flex flex-col overflow-hidden bg-gray-100">
          <div className="flex-none h-[76px] border-b border-gray-200 bg-gray-50">
            <div className="max-w-[1000px] mx-auto h-full flex items-center justify-between px-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Report Builder
              </h1>
              <div className="text-sm text-gray-600">
                Last Saved: {lastSaved ? lastSaved.toLocaleString() : "Never"}
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-auto p-8">
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
        </div>
        <ResizableSidebar
          selectedComponent={selectedComponent}
          updateComponent={updateComponent}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDeleteComponent}
        />
      </main>
      <DragOverlay>
        {activeComponent && (
          <div
            className="bg-white border rounded shadow-md"
            style={{ width: "250px", opacity: 0.8 }}
          >
            {activeComponent.type === "text" ? (
              <TextComponent component={activeComponent} onClick={() => {}} />
            ) : activeComponent.type === "table" ? (
              <TableComponent component={activeComponent} onClick={() => {}} />
            ) : (
              <SpacerComponent component={activeComponent} onClick={() => {}} />
            )}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Home;
