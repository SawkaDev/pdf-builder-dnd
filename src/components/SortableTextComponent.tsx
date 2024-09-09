import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TextComponent } from "./TextComponent";
import { DragHandle } from "./DragHandle";
import { ComponentProps } from "@/types";

export const SortableTextComponent: React.FC<ComponentProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

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
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center relative ${
        isHovered ? "z-10" : "z-0"
      } w-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex-grow transition-all duration-200 ${
          isHovered ? "border border-gray-300 shadow-md rounded" : ""
        }`}
      >
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
