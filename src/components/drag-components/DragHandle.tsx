import React, { forwardRef } from 'react';
import { GripVertical } from 'lucide-react';

export const DragHandle = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-center justify-center w-8 h-8 cursor-move touch-none"
      {...props}
    >
      <GripVertical size={20} />
    </div>
  );
});

DragHandle.displayName = 'DragHandle';
