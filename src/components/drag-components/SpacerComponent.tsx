import React from "react";
import { SpacerComponentData } from "@/types";

interface SpacerComponentProps {
  component: SpacerComponentData;
  onClick: () => void;
}

export const SpacerComponent: React.FC<SpacerComponentProps> = ({
  component,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="m-2 w-full border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out"
      style={{ height: `${component.height}px` }}
    >
      <p className="text-gray-500 text-sm">Spacer: {component.height}px</p>
    </div>
  );
};
