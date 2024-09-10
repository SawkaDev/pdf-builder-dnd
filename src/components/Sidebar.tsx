import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  ComponentData,
  TextComponentData,
  TableComponentData,
  TableColumnData,
  TableRowData,
  SpacerComponentData,
} from "@/types";
import { v4 as uuidv4 } from "uuid";
import { SidebarActions } from "./SidebarActions";

interface SidebarProps {
  selectedComponent: ComponentData | null;
  updateComponent: (updatedComponent: ComponentData) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: string) => void; // Add this line
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedComponent,
  updateComponent,
  onSave,
  onCancel,
  onDelete, // Add this line
}) => {
  if (!selectedComponent) {
    return (
      <div className="h-full p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
          Component Configuration
        </h2>
        <p className="text-lg">Select or add a component to edit.</p>
      </div>
    );
  }

  const handleDelete = () => {
    onDelete(selectedComponent.id);
  };

  if (selectedComponent.type === "text") {
    const textComponent = selectedComponent as TextComponentData;

    const handleTextChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      updateComponent({
        ...textComponent,
        content: e.target.value,
      });
    };

    const handleSizeChange = (value: string) => {
      updateComponent({
        ...textComponent,
        size: value as TextComponentData["size"],
      });
    };

    return (
      <div className="h-full flex flex-col">
        <div className="flex-grow overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
            Text Configuration
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text" className="text-lg">
                Text Content
              </Label>
              <Textarea
                id="text"
                value={textComponent.content}
                onChange={handleTextChange}
                rows={6}
                className="w-full resize-none text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size" className="text-lg">
                Text Size
              </Label>
              <Select
                onValueChange={handleSizeChange}
                defaultValue={textComponent.size}
              >
                <SelectTrigger id="size" className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p">Paragraph</SelectItem>
                  <SelectItem value="h1">Heading 1</SelectItem>
                  <SelectItem value="h2">Heading 2</SelectItem>
                  <SelectItem value="h3">Heading 3</SelectItem>
                  <SelectItem value="h4">Heading 4</SelectItem>
                  <SelectItem value="h5">Heading 5</SelectItem>
                  <SelectItem value="h6">Heading 6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <SidebarActions
          onDelete={handleDelete}
          onCancel={onCancel}
          onSave={onSave}
        />
      </div>
    );
  }

  if (selectedComponent.type === "table") {
    const tableComponent = selectedComponent as TableComponentData;

    const addColumn = () => {
      const newColumn: TableColumnData = {
        id: uuidv4(),
        name: `Column ${tableComponent.columns.length + 1}`,
      };
      updateComponent({
        ...tableComponent,
        columns: [...tableComponent.columns, newColumn],
        rows: tableComponent.rows.map((row) => ({
          ...row,
          cells: [...row.cells, ""],
        })),
      });
    };

    const updateColumnName = (columnId: string, newName: string) => {
      updateComponent({
        ...tableComponent,
        columns: tableComponent.columns.map((col) =>
          col.id === columnId ? { ...col, name: newName } : col
        ),
      });
    };

    const addRow = () => {
      const newRow: TableRowData = {
        id: uuidv4(),
        cells: Array(tableComponent.columns.length).fill(""),
      };
      updateComponent({
        ...tableComponent,
        rows: [...tableComponent.rows, newRow],
      });
    };

    const updateCellData = (
      rowId: string,
      columnIndex: number,
      value: string
    ) => {
      updateComponent({
        ...tableComponent,
        rows: tableComponent.rows.map((row) =>
          row.id === rowId
            ? {
                ...row,
                cells: row.cells.map((cell, index) =>
                  index === columnIndex ? value : cell
                ),
              }
            : row
        ),
      });
    };

    return (
      <div className="h-full flex flex-col">
        <div className="flex-grow overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
            Table Configuration
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Columns</h3>
              {tableComponent.columns.map((column, index) => (
                <div
                  key={column.id}
                  className="flex items-center space-x-2 mb-2"
                >
                  <Input
                    value={column.name}
                    onChange={(e) =>
                      updateColumnName(column.id, e.target.value)
                    }
                    placeholder={`Column ${index + 1}`}
                  />
                </div>
              ))}
              <Button onClick={addColumn} variant="outline" className="mt-2">
                Add Column
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Rows</h3>
              {tableComponent.rows.map((row, rowIndex) => (
                <div key={row.id} className="mb-4">
                  <h4 className="font-medium mb-1">Row {rowIndex + 1}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {row.cells.map((cell, cellIndex) => (
                      <Input
                        key={`${row.id}-${cellIndex}`}
                        value={cell}
                        onChange={(e) =>
                          updateCellData(row.id, cellIndex, e.target.value)
                        }
                        placeholder={`${
                          tableComponent.columns[cellIndex]?.name ||
                          `Column ${cellIndex + 1}`
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <Button onClick={addRow} variant="outline" className="mt-2">
                Add Row
              </Button>
            </div>
          </div>
        </div>
        <SidebarActions
          onDelete={handleDelete}
          onCancel={onCancel}
          onSave={onSave}
        />
      </div>
    );
  }

  if (selectedComponent.type === "spacer") {
    const spacerComponent = selectedComponent as SpacerComponentData;

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const height = parseInt(e.target.value, 10);
      if (!isNaN(height)) {
        updateComponent({
          ...spacerComponent,
          height,
        });
      }
    };

    return (
      <div className="h-full flex flex-col">
        <div className="flex-grow overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
            Spacer Configuration
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="height" className="text-lg">
                Height (px)
              </Label>
              <Input
                id="height"
                type="number"
                value={spacerComponent.height}
                onChange={handleHeightChange}
                min={1}
                className="w-full text-base"
              />
            </div>
          </div>
        </div>
        <SidebarActions
          onDelete={handleDelete}
          onCancel={onCancel}
          onSave={onSave}
        />
      </div>
    );
  }

  return null;
};
