import { TextComponentData } from "@/types";
import { SidebarProps } from "../Sidebar";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { SidebarActions } from "../SidebarActions";

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

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateComponent({
      ...textComponent,
      content: e.target.value,
    });
  };

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
