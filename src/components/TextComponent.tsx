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

  return (
    <div onClick={onClick} className="p-2">
      <p style={{ fontSize: `${size}px` }}>{content}</p>
    </div>
  );
};
