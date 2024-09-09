export interface TextComponentData {
  id: string;
  type: "text";
  content: string;
  size: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  isMultiline: boolean;
}

export interface TableColumnData {
  id: string;
  name: string;
}

export interface TableRowData {
  id: string;
  cells: string[];
}

export interface TableComponentData {
  id: string;
  type: "table";
  columns: TableColumnData[];
  rows: TableRowData[];
}

export type ComponentData = TextComponentData | TableComponentData;
