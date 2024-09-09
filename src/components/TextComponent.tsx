import React from "react";
import { ComponentProps } from "@/types";

export const TextComponent: React.FC<ComponentProps> = ({
  component,
  onClick,
}) => {
  const { content, size, isMultiline } = component;

  const renderTextElement = () => {
    switch (size) {
      case "h1":
        return <h1 className="text-4xl font-bold">{content}</h1>;
      case "h2":
        return <h2 className="text-3xl font-bold">{content}</h2>;
      case "h3":
        return <h3 className="text-2xl font-bold">{content}</h3>;
      case "h4":
        return <h4 className="text-xl font-bold">{content}</h4>;
      case "h5":
        return <h5 className="text-lg font-bold">{content}</h5>;
      case "h6":
        return <h6 className="text-base font-bold">{content}</h6>;
      default:
        return isMultiline ? (
          <p className="text-base whitespace-pre-wrap">{content}</p>
        ) : (
          <p className="text-base">{content}</p>
        );
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-move p-2 border border-gray-200 rounded mb-2"
    >
      {renderTextElement()}
    </div>
  );
};
