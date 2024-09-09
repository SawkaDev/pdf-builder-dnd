import React from 'react';
import { ComponentData, TableComponentData } from '@/types';

interface TableComponentProps {
  component: ComponentData;
  onClick: () => void;
}

export const TableComponent: React.FC<TableComponentProps> = ({ component, onClick }) => {
  // Type guard to check if the component is a table
  if (component.type !== 'table') {
    return null; // or some placeholder for non-table components
  }

  const tableComponent = component as TableComponentData;

  if (tableComponent.columns.length === 0 || tableComponent.rows.length === 0) {
    return (
      <div onClick={onClick} className="p-4 border border-dashed border-gray-300 rounded-md">
        <p className="text-gray-500">Empty table. Configure in sidebar.</p>
      </div>
    );
  }

  return (
    <div onClick={onClick} className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {tableComponent.columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableComponent.rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell, index) => (
                <td key={`${row.id}-${index}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
