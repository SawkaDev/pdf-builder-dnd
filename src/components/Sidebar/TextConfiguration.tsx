import { TextComponentData } from "@/types";
import { SidebarProps } from "../Sidebar";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SidebarActions } from "../SidebarActions";

const TextConfiguration: React.FC<SidebarProps> = ({
  selectedComponent,
  updateComponent,
  onSave,
  onCancel,
  onDelete,
}) => {
  if (!selectedComponent) {
    return <></>;
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

  const handleSizeChange = (value: string) => {
    updateComponent({
      ...textComponent,
      size: value as TextComponentData["size"],
    });
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
};

export default TextConfiguration;
