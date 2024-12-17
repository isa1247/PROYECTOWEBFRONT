import React from 'react';

interface Materia {
  id: number;
  nombre: string;
  nivel: string;
  descripcion: string;
}

interface MateriasTableProps {
  materias: Materia[];
}

function MateriasTable({ materias }: MateriasTableProps) {
  return (
    <div className="flex-1 overflow-auto px-4">
      {/* Tabla de materias */}
      <table className="min-w-full mt-4 bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nivel
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {materia.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {materia.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {materia.nivel}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {materia.descripcion}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                <button className="text-blue-600 hover:text-blue-900">
                  Editar
                </button>
                <button className="text-red-600 hover:text-red-900 ml-4">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MateriasTable;
