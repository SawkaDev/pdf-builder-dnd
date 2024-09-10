import React from "react";
import { HeaderComponentData } from "@/types";

interface HeaderComponentProps {
  component: HeaderComponentData;
  onClick: () => void;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  component,
  onClick,
}) => {
  const { content, level } = component;

  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;

  const sizeClasses = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
  };

  return (
    <div onClick={onClick} className="p-2">
      <HeaderTag className={`font-bold ${sizeClasses[level]}`}>
        {content}
      </HeaderTag>
    </div>
  );
};
