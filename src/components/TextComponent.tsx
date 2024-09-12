import React from "react";
import { TextComponentData } from "@/types";
import DOMPurify from "dompurify";
import parse, { DOMNode, Element, domToReact } from "html-react-parser";

interface TextComponentProps {
  component: TextComponentData;
  onClick: () => void;
}

const styles = {
  ul: { paddingLeft: "20px", listStyleType: "disc", margin: "0em 0em" },
  ol: { paddingLeft: "20px", listStyleType: "decimal", margin: "0em 0em" },
  p: { minHeight: "1em", margin: "0.5em 0" },
  // "li > p": { margin: "0" }
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
          let style = styles[elementName];

          // Special handling for p tags inside li
          if (
            elementName === "p" &&
            domNode.parent &&
            (domNode.parent as Element).name === "li"
          ) {
            style = styles["li > p"];
          }

          return (
            <TagName style={style} {...domNode.attribs}>
              {domNode.children.length === 0 && elementName === "p" ? (
                <br />
              ) : (
                domToReact(domNode.children as unknown as DOMNode[], options)
              )}
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
