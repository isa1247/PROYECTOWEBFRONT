// src/components/admin/EstudiantesTable.tsx
import React from 'react';

interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  carrera: string;
}

interface EstudiantesTableProps {
  estudiantes: Estudiante[];
}

const EstudiantesTable: React.FC<EstudiantesTableProps> = ({ estudiantes }) => {
  const handleEdit = (id: number) => {
    // Lógica para editar el estudiante con el ID proporcionado
    console.log(`Editar estudiante con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Lógica para eliminar el estudiante con el ID proporcionado
    console.log(`Eliminar estudiante con ID: ${id}`);
  };

  return (
    <div className="flex-1 overflow-auto px-4 py-4 bg-gray-100">
      {/* Tabla de estudiantes */}
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apellido
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Carrera
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {estudiante.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {estudiante.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {estudiante.apellido}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {estudiante.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {estudiante.carrera}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => handleEdit(estudiante.id)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:text-red-900 ml-4"
                  onClick={() => handleDelete(estudiante.id)}
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

export default EstudiantesTable;
