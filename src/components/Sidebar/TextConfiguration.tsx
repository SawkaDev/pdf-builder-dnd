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
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content:
      selectedComponent?.type === "text"
        ? (selectedComponent as TextComponentData).content
        : "",
    onUpdate: ({ editor }) => {
      if (selectedComponent?.type === "text") {
        updateComponent({
          ...selectedComponent,
          content: editor.getHTML(),
        });
      }
    },
    // editorProps: {
    //   attributes: {
    //     class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    //   },
    // },
    // parseOptions: {
    //   preserveWhitespace: 'full',
    // },
  });

  if (!selectedComponent || selectedComponent.type !== "text") {
    return null;
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value, 10);
    if (!isNaN(size)) {
      updateComponent({
        ...selectedComponent,
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
            <div className="border rounded-md overflow-hidden bg-white">
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
              value={selectedComponent.size}
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
