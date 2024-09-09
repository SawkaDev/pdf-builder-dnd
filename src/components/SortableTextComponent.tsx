import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TextComponent } from "./TextComponent";
import { DragHandle } from "./DragHandle";
import { ComponentProps } from "@/types";

export const SortableTextComponent: React.FC<ComponentProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center">
      <div className="flex-grow">
        <TextComponent
          {...props}
          isDragging={isDragging}
          onClick={props.onClick}
        />
      </div>
      <DragHandle {...attributes} {...listeners} />
    </div>
  );
};
