import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TextComponent } from "./TextComponent";
import { ComponentProps } from "@/types";
import { GripVertical } from "lucide-react"; // Make sure to install lucide-react if you haven't

export const SortableTextComponent: React.FC<ComponentProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center group">
      <div
        {...attributes}
        {...listeners}
        className="cursor-move opacity-0 group-hover:opacity-100 mr-2"
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-grow">
        <TextComponent {...props} />
      </div>
    </div>
  );
};
