import { TableColumnData, TableComponentData, TableRowData } from "@/types";
import { SidebarProps } from "../Sidebar";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SidebarActions } from "../SidebarActions";

const TableConfiguration: React.FC<SidebarProps> = ({
  selectedComponent,
  updateComponent,
  onSave,
  onCancel,
  onDelete,
}) => {
  if (!selectedComponent) {
    return <></>;
  }
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

  const handleDelete = () => {
    onDelete(selectedComponent.id);
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
              <div key={column.id} className="flex items-center space-x-2 mb-2">
                <Input
                  value={column.name}
                  onChange={(e) => updateColumnName(column.id, e.target.value)}
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
};

export default TableConfiguration;
