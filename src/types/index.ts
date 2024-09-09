export interface TextComponentData {
  id: string;
  type: 'text';
  content: string;
  size: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  isMultiline: boolean;
}

export type ComponentData = TextComponentData;

export interface ComponentProps {
  component: ComponentData;
  onClick: () => void;
}
