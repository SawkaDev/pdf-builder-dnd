import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableTextComponent } from './SortableTextComponent';
import { ComponentData } from '@/types';

interface CanvasProps {
  components: ComponentData[];
  setSelectedComponent: (component: ComponentData) => void;
  onCanvasClick: (event: React.MouseEvent) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ components, setSelectedComponent, onCanvasClick }) => {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div 
      ref={setNodeRef} 
      className="bg-white p-4 min-h-full"
      onClick={onCanvasClick}
    >
      <h2 className="text-lg font-bold mb-4">Report Canvas</h2>
      <div className="space-y-2">
        {components.map((component) => (
          <SortableTextComponent
            key={component.id}
            component={component}
            onClick={() => setSelectedComponent(component)}
          />
        ))}
      </div>
    </div>
  );
};
