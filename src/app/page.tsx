"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  Active,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  ComponentData,
  HeaderComponentData,
  SpacerComponentData,
  TableComponentData,
  TextComponentData,
} from "@/types";
import { TextComponent } from "@/components/drag-components/TextComponent";
import { v4 as uuidv4 } from "uuid";
import { TableComponent } from "@/components/drag-components/TableComponent";
import { SpacerComponent } from "@/components/drag-components/SpacerComponent";
import { HeaderComponent } from "@/components/drag-components/HeaderComponent";
import { Button } from "@/components/ui/button";
import { Popup } from "@/components/pop-up/Popup";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { CanvasWrapper } from "@/components/canvas/CanvasWrapper";
import { ResizableSidebar } from "@/components/side-bar/ResizableSidebar";

const Home: React.FC = () => {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    const savedComponentsJSON = localStorage.getItem("savedComponents");
    if (savedComponentsJSON) {
      try {
        const savedComponents = JSON.parse(savedComponentsJSON);
        setComponents(savedComponents);
      } catch (error) {
        console.error("Error parsing saved components:", error);
      }
    }

    const lastSavedTimeString = localStorage.getItem("lastSavedTime");
    if (lastSavedTimeString) {
      try {
        const lastSavedTime = new Date(lastSavedTimeString);
        setLastSaved(lastSavedTime);
      } catch (error) {
        console.error("Error parsing last saved time:", error);
      }
    }
  }, []);

  const closePopup = () => {
    setOpenPopup(false);
  };

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

  const handleDeleteComponent = (id: string) => {
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== id)
    );
    setSelectedComponent(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveComponent(active.data.current as ComponentData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (isNewComponent(String(active.id)) && over) {
      const newComponent = createNewComponent(active);
      setComponents((prevComponents) =>
        insertComponent(prevComponents, newComponent, String(over.id))
      );
    } else if (over && active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveComponent(null);
  };

  const isNewComponent = (id: string) => {
    return [
      "text-component",
      "table-component",
      "header-component",
      "spacer-component",
    ].includes(id);
  };

  const createNewComponent = (active: Active): ComponentData => {
    switch (active.id) {
      case "text-component":
        return { ...(active.data.current as TextComponentData), id: uuidv4() };
      case "header-component":
        return {
          ...(active.data.current as HeaderComponentData),
          id: uuidv4(),
        };
      case "spacer-component":
        return {
          ...(active.data.current as SpacerComponentData),
          id: uuidv4(),
          height: 20,
        };
      case "table-component":
        return {
          ...(active.data.current as TableComponentData),
          id: uuidv4(),
          columns: [],
          rows: [],
        };
      default:
        throw new Error("Unknown component type");
    }
  };

  const insertComponent = (
    components: ComponentData[],
    newComponent: ComponentData,
    overId: string
  ) => {
    if (overId === "canvas") {
      return [...components, newComponent];
    } else {
      const overIndex = components.findIndex((c) => c.id === overId);
      return [
        ...components.slice(0, overIndex),
        newComponent,
        ...components.slice(overIndex),
      ];
    }
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
    localStorage.setItem("savedComponents", JSON.stringify(components));

    const currentTime = new Date();
    setLastSaved(currentTime);

    localStorage.setItem("lastSavedTime", currentTime.toISOString());
  };

  const handleCancel = () => {
    setSelectedComponent(null);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(components),
      });

      if (!response.ok) {
        setOpenPopup(true);
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Popup
        title="Rate Limit Exceeded!"
        isOpen={openPopup}
        onClose={closePopup}
      >
        Only 2 Generation requests per 10 seconds are allowed.
      </Popup>
      <main className="flex h-screen overflow-hidden">
        <div className="flex-none w-80 h-full overflow-y-auto border-r border-gray-200 bg-gray-50">
          <Toolbar />
        </div>
        <div className="flex-grow flex flex-col overflow-hidden bg-gray-100">
          <Header
            lastSaved={lastSaved}
            onSave={handleSave}
            onExport={handleExport}
            isExporting={isExporting}
          />
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
          <DragOverlayComponent activeComponent={activeComponent} />
        )}
      </DragOverlay>
    </DndContext>
  );
};

const Header: React.FC<{
  lastSaved: Date | null;
  onSave: () => void;
  onExport: () => void;
  isExporting: boolean;
}> = ({ lastSaved, onSave, onExport, isExporting }) => (
  <div className="flex-none h-[76px] border-b border-gray-200 bg-gray-50">
    <div className="max-w-[1000px] mx-auto h-full flex items-center justify-between px-6">
      <div className="flex space-x-4">
        <Button
          onClick={onSave}
          className="text-base px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save
        </Button>
        <Button
          onClick={onExport}
          className="text-base px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </div>
      <div className="text-sm text-gray-600">
        Last Saved: {lastSaved ? lastSaved.toLocaleString() : "Never"}
      </div>
    </div>
  </div>
);

const DragOverlayComponent: React.FC<{ activeComponent: ComponentData }> = ({
  activeComponent,
}) => (
  <div
    className="bg-white border rounded shadow-md"
    style={{ width: "250px", opacity: 0.8 }}
  >
    {activeComponent.type === "text" ? (
      <TextComponent component={activeComponent} onClick={() => {}} />
    ) : activeComponent.type === "header" ? (
      <HeaderComponent component={activeComponent} onClick={() => {}} />
    ) : activeComponent.type === "table" ? (
      <TableComponent component={activeComponent} onClick={() => {}} />
    ) : (
      <SpacerComponent component={activeComponent} onClick={() => {}} />
    )}
  </div>
);

export default Home;
