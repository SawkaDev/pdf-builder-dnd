import React from "react";
import { TextComponentData } from "@/types";
import { SidebarProps } from "../Sidebar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SidebarActions } from "../SidebarActions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Button } from "../ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
} from "lucide-react";

const TextConfiguration: React.FC<SidebarProps> = ({
  selectedComponent,
  updateComponent,
  onSave,
  onCancel,
  onDelete,
}) => {
  if (!selectedComponent || selectedComponent.type !== "text") {
    return null;
  }

  const textComponent = selectedComponent as TextComponentData;

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: textComponent.content,
    onUpdate: ({ editor }) => {
      updateComponent({
        ...textComponent,
        content: editor.getHTML(),
      });
    },
  });

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    if (!isNaN(size)) {
      updateComponent({
        ...textComponent,
        size,
      });
    }
  };

  const handleDelete = () => {
    onDelete(selectedComponent.id);
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
            <div className="border rounded-md overflow-hidden">
              <div className="flex flex-wrap gap-1 p-1 bg-gray-50 border-b">
                <Button
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 ${
                    editor?.isActive("bold") ? "bg-gray-200" : ""
                  }`}
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 ${
                    editor?.isActive("italic") ? "bg-gray-200" : ""
                  }`}
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 ${
                    editor?.isActive("underline") ? "bg-gray-200" : ""
                  }`}
                >
                  <UnderlineIcon className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 ${
                    editor?.isActive("bulletList") ? "bg-gray-200" : ""
                  }`}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 ${
                    editor?.isActive("orderedList") ? "bg-gray-200" : ""
                  }`}
                >
                  <ListOrdered className="w-4 h-4" />
                </Button>
              </div>
              <EditorContent
                editor={editor}
                className="p-2 focus-within:outline-none min-h-[100px]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="size" className="text-lg">
              Font Size (px)
            </Label>
            <Input
              id="size"
              type="number"
              value={textComponent.size}
              onChange={handleSizeChange}
              min={1}
              max={100}
              className="w-full"
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
};

export default TextConfiguration;
