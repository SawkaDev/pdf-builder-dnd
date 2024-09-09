// src/components/Sidebar.tsx

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
import { ComponentData, TextComponentData } from "@/types";

interface SidebarProps {
  selectedComponent: ComponentData | null;
  updateComponent: (updatedComponent: ComponentData) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedComponent,
  updateComponent,
  onSave,
  onCancel,
}) => {
  if (!selectedComponent) {
    return (
      <div className="h-full bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Component Configuration</h2>
        <p>Select a component to edit</p>
      </div>
    );
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateComponent({
      ...selectedComponent,
      content: e.target.value,
    } as TextComponentData);
  };

  const handleSizeChange = (value: string) => {
    const isMultiline = value === "p";
    updateComponent({
      ...selectedComponent,
      size: value as TextComponentData["size"],
      isMultiline,
    } as TextComponentData);
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-bold">Component Configuration</h2>
          <div className="space-y-2">
            <Label htmlFor="text">Text Content</Label>
            {(selectedComponent as TextComponentData).isMultiline ? (
              <Textarea
                id="text"
                value={(selectedComponent as TextComponentData).content}
                onChange={handleTextChange}
                rows={5}
                className="w-full resize-none"
              />
            ) : (
              <Input
                id="text"
                value={(selectedComponent as TextComponentData).content}
                onChange={handleTextChange}
                className="w-full"
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Text Size</Label>
            <Select
              onValueChange={handleSizeChange}
              defaultValue={(selectedComponent as TextComponentData).size}
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
      <div className="p-4 bg-gray-200 border-t border-gray-300">
        <div className="flex justify-end space-x-2">
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};
