import React from "react";
import { TextComponentData } from "@/types";
import DOMPurify from "dompurify";
import parse, { DOMNode, domToReact, Element } from "html-react-parser";

interface TextComponentProps {
  component: TextComponentData;
  onClick: () => void;
}

const styles = {
  ul: { paddingLeft: "20px", listStyleType: "disc" },
  ol: { paddingLeft: "20px", listStyleType: "decimal" },
  // li: { marginBottom: "0.25em" },
  // p: { marginBottom: "0.5em" },
};

export const TextComponent: React.FC<TextComponentProps> = ({
  component,
  onClick,
}) => {
  const { content, size } = component;

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(content);

  const options = {
    replace: (domNode: any) => {
      if (domNode instanceof Element) {
        const elementName = domNode.name as keyof typeof styles;
        if (styles[elementName]) {
          const TagName = domNode.name as keyof JSX.IntrinsicElements;
          return (
            <TagName style={styles[elementName]} {...domNode.attribs}>
              {domToReact(domNode.children as DOMNode[], options)}
            </TagName>
          );
        }
      }
    },
  };

  return (
    <div onClick={onClick} className="p-2">
      <div style={{ fontSize: `${size}px` }}>
        {parse(sanitizedContent, options)}
      </div>
    </div>
  );
};
