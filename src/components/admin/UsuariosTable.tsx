// src/components/admin/UsuariosTable.tsx
import React from 'react';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  carrera?: string; // Campo adicional para estudiantes
}

interface UsuariosTableProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: number) => void;
  tipoUsuario: 'Docente' | 'Estudiante';
}

const UsuariosTable: React.FC<UsuariosTableProps> = ({
  usuarios,
  onEdit,
  onDelete,
  tipoUsuario,
}) => {
  return (
    <div className="flex-1 overflow-auto px-4 py-4 bg-gray-100">
      {/* Tabla de usuarios */}
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
            {tipoUsuario === 'Estudiante' && (
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Carrera
              </th>
            )}
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {usuario.nombre}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {usuario.apellido}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.email}
              </td>
              {tipoUsuario === 'Estudiante' && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {usuario.carrera}
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => onEdit(usuario)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:text-red-900 ml-4"
                  onClick={() => onDelete(usuario.id)}
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

export default UsuariosTable;
