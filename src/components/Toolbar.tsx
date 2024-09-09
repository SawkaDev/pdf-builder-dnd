import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Button } from './ui/button';
import { TextComponentData } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const Toolbar: React.FC = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'text-component',
    data: {
      type: 'text',
      content: 'New Text',
      size: 'p',
      isMultiline: true,
      id: uuidv4(),
    } as TextComponentData,
  });

  return (
    <div className="h-full bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Component Toolbar</h2>
      <Button
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        Add Text Component
      </Button>
    </div>
  );
};
