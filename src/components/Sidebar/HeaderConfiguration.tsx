import { HeaderComponentData } from "@/types";
import { SidebarProps } from "../Sidebar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SidebarActions } from "../SidebarActions";

const HeaderConfiguration: React.FC<SidebarProps> = ({
  selectedComponent,
  updateComponent,
  onSave,
  onCancel,
  onDelete,
}) => {
  if (!selectedComponent || selectedComponent.type !== "header") {
    return null;
  }

  const headerComponent = selectedComponent as HeaderComponentData;

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateComponent({
      ...headerComponent,
      content: e.target.value,
    });
  };

  const handleLevelChange = (value: string) => {
    updateComponent({
      ...headerComponent,
      level: parseInt(value) as HeaderComponentData["level"],
    });
  };

  const handleDelete = () => {
    onDelete(selectedComponent.id);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
          Header Configuration
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="headerContent" className="text-lg">
              Header Content
            </Label>
            <Input
              id="headerContent"
              value={headerComponent.content}
              onChange={handleHeaderChange}
              className="w-full text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headerLevel" className="text-lg">
              Header Level
            </Label>
            <Select
              onValueChange={handleLevelChange}
              defaultValue={headerComponent.level.toString()}
            >
              <SelectTrigger id="headerLevel" className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    H{level}
                  </SelectItem>
                ))}
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

export default HeaderConfiguration;
