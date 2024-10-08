import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TextComponent } from "./TextComponent";
import { TableComponent } from "./TableComponent";
import { SpacerComponent } from "./SpacerComponent";
import { ComponentData } from "@/types";
import { GripVertical } from "lucide-react";
import { HeaderComponent } from "./HeaderComponent";

interface SortableComponentProps {
  component: ComponentData & { isInsertionPoint?: boolean };
  onClick: () => void;
}

export const SortableComponent: React.FC<SortableComponentProps> = ({
  component,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderComponent = () => {
    switch (component.type) {
      case "header":
        return <HeaderComponent component={component} onClick={onClick} />;
      case "text":
        return <TextComponent component={component} onClick={onClick} />;
      case "table":
        return <TableComponent component={component} onClick={onClick} />;
      case "spacer":
        return <SpacerComponent component={component} onClick={onClick} />;
      default:
        return null;
    }
  };

  return (
    <>
      {component.isInsertionPoint && (
        <div className="h-0.5 bg-blue-400 w-full transition-all duration-300 ease-in-out" />
      )}
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center hover:bg-gray-50 transition-all duration-200 ease-in-out"
      >
        <div
          {...attributes}
          {...listeners}
          className="p-1 text-gray-400 cursor-move"
        >
          <GripVertical size={16} />
        </div>
        <div className="flex-grow py-1 px-1" onClick={onClick}>
          {renderComponent()}
        </div>
      </div>
    </>
  );
};
