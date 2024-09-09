import React from "react";
import { ComponentProps } from "@/types";

interface TextComponentProps extends ComponentProps {
  isDragging?: boolean;
}

export const TextComponent: React.FC<TextComponentProps> = ({
  component,
  onClick,
  isDragging,
}) => {
  const { content, size } = component;

  const renderTextElement = () => {
    switch (size) {
      case "h1":
        return <h1 className="text-2xl font-bold">{content}</h1>;
      case "h2":
        return <h2 className="text-xl font-bold">{content}</h2>;
      case "h3":
        return <h3 className="text-lg font-bold">{content}</h3>;
      case "h4":
        return <h4 className="text-base font-bold">{content}</h4>;
      case "h5":
        return <h5 className="text-sm font-bold">{content}</h5>;
      case "h6":
        return <h6 className="text-xs font-bold">{content}</h6>;
      default:
        // text-base
        return <p className="text-sm">{content}</p>;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-2 ${isDragging ? "opacity-50" : ""} ${
        component.id === "text-component"
          ? "border border-dashed border-gray-300 rounded"
          : ""
      }`}
    >
      {renderTextElement()}
    </div>
  );
};
