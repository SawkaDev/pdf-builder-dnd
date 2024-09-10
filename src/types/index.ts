export interface TextComponentData {
  id: string;
  type: "text";
  content: string;
  size: number;
  isMultiline: boolean;
}
export interface HeaderComponentData {
  id: string;
  type: "header";
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
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

export interface SpacerComponentData {
  id: string;
  type: "spacer";
  height: number;
}

export type ComponentData =
  | TextComponentData
  | HeaderComponentData
  | TableComponentData
  | SpacerComponentData;
