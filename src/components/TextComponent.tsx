// TextComponent.tsx
import React from "react";
import { TextComponentData } from "@/types";

interface TextComponentProps {
  component: TextComponentData;
  onClick: () => void;
}

export const TextComponent: React.FC<TextComponentProps> = ({
  component,
  onClick,
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
        return <p className="text-sm">{content}</p>;
    }
  };

  return (
    <div onClick={onClick} className="p-2">
      {renderTextElement()}
    </div>
  );
};
