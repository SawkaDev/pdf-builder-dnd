import { SpacerComponentData } from "@/types";
import { SidebarProps } from "../Sidebar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SidebarActions } from "../SidebarActions";

const SpacerConfiguration: React.FC<SidebarProps> = ({
  selectedComponent,
  updateComponent,
  onSave,
  onCancel,
  onDelete,
}) => {
  if (!selectedComponent) {
    return <></>;
  }

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

  const handleDelete = () => {
    onDelete(selectedComponent.id);
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
};

export default SpacerConfiguration;
