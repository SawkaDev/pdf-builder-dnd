import React from "react";
import { ComponentData, TableComponentData } from "@/types";

interface TableComponentProps {
  component: ComponentData;
  onClick: () => void;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  component,
  onClick,
}) => {
  if (component.type !== "table") {
    return null;
  }

  const tableComponent = component as TableComponentData;

  if (tableComponent.columns.length === 0 || tableComponent.rows.length === 0) {
    return (
      <div
        onClick={onClick}
        className="p-4 m-2 border border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out"
      >
        <p className="text-gray-500 text-center">
          Click to create table layout
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="w-full overflow-x-auto border border-gray-200 m-2"
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {tableComponent.columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className="px-6 py-2 text-left text-sm font-bold text-gray-700 tracking-wider"
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableComponent.rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={`${row.id}-${cellIndex}`}
                  className="px-6 py-2 whitespace-nowrap text-sm text-gray-500"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
