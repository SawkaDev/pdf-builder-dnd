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
      <div className="h-full p-6">
        <h2 className="text-2xl font-bold mb-6">Component Configuration</h2>
        <p className="text-lg">Select a component to edit</p>
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
    updateComponent({
      ...selectedComponent,
      size: value as TextComponentData["size"],
    } as TextComponentData);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-8">Component Configuration</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text" className="text-lg">
              Text Content
            </Label>
            <Textarea
              id="text"
              value={(selectedComponent as TextComponentData).content}
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
      <div className="p-6 bg-gray-100 border-t border-gray-200">
        <div className="flex justify-end space-x-4">
          <Button
            onClick={onCancel}
            variant="outline"
            className="text-base px-6 py-2"
          >
            Cancel
          </Button>
          <Button onClick={onSave} className="text-base px-6 py-2">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
