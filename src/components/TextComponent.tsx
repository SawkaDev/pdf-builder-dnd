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
        return <h1 className="text-4xl font-bold mb-4">{content}</h1>;
      case "h2":
        return <h2 className="text-3xl font-bold mb-3">{content}</h2>;
      case "h3":
        return <h3 className="text-2xl font-bold mb-2">{content}</h3>;
      case "h4":
        return <h4 className="text-xl font-bold mb-2">{content}</h4>;
      case "h5":
        return <h5 className="text-lg font-bold mb-1">{content}</h5>;
      case "h6":
        return <h6 className="text-base font-bold mb-1">{content}</h6>;
      default:
        return <p className="text-base mb-4">{content}</p>;
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
