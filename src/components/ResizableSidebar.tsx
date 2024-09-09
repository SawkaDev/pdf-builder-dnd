import React, { useState, useCallback, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { ComponentData } from "@/types";

interface ResizableSidebarProps {
  selectedComponent: ComponentData | null;
  updateComponent: (updatedComponent: ComponentData) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ResizableSidebar: React.FC<ResizableSidebarProps> = (props) => {
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(384); // Initial width (96 * 4)

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const newWidth = window.innerWidth - mouseMoveEvent.clientX;

        // Ensure the sidebar width does not exceed 400px and is at least 300px
        setSidebarWidth(Math.max(300, Math.min(newWidth, 600)));
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="flex h-full">
      <div
        className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400 transition-colors"
        onMouseDown={startResizing}
      />
      <div
        style={{ width: `${sidebarWidth}px` }}
        className="flex-shrink-0 h-full overflow-hidden border-l border-gray-200 bg-gray-50"
      >
        <Sidebar {...props} />
      </div>
    </div>
  );
};
