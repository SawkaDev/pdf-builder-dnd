import React from 'react';
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface SidebarActionsProps {
  onDelete: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const SidebarActions: React.FC<SidebarActionsProps> = ({ onDelete, onCancel, onSave }) => {
  return (
    <div className="p-6 bg-gray-100 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <Button
          onClick={onDelete}
          variant="ghost"
          className="text-gray-500 hover:text-red-600 hover:bg-red-100"
          title="Delete component"
        >
          <Trash2 size={20} />
        </Button>
        <div className="space-x-4">
          <Button
            onClick={onCancel}
            variant="outline"
            className="text-base px-6 py-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={onSave} 
            className="text-base px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
