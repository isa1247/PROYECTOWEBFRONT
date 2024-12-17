// src/components/admin/PeriodosTable.tsx
import React from 'react';

interface Periodo {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
}

interface PeriodosTableProps {
  periodos: Periodo[];
  onEdit: (periodo: Periodo) => void;
  onDelete: (id: number) => void;
}

const PeriodosTable: React.FC<PeriodosTableProps> = ({
  periodos,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex-1 overflow-auto px-4 py-4 bg-gray-100">
      {/* Tabla de periodos */}
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Inicio
            </th>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Fin
            </th>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {periodos.map((periodo) => (
            <tr key={periodo.id}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {periodo.id}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {periodo.nombre}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(periodo.fechaInicio).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(periodo.fechaFin).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => onEdit(periodo)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:text-red-900 ml-4"
                  onClick={() => onDelete(periodo.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeriodosTable;
