// src/components/admin/AsignacionesTable.tsx
import React from 'react';

interface Asignacion {
  id: number;
  materia_id: number;
  docente_id: number;
  periodo_id: number;
}

interface AsignacionesTableProps {
  asignaciones: Asignacion[];
  getMateriaNombre: (id: number) => string;
  getDocenteNombre: (id: number) => string;
  getPeriodoNombre: (id: number) => string;
  onEdit: (asignacion: Asignacion) => void;
  onDelete: (id: number) => void;
}

const AsignacionesTable: React.FC<AsignacionesTableProps> = ({
  asignaciones,
  getMateriaNombre,
  getDocenteNombre,
  getPeriodoNombre,
  onEdit,
  onDelete,
}) => {
  if (!Array.isArray(asignaciones)) {
    return <p>No hay asignaciones disponibles.</p>;
  }

  return (
    <div className="flex-1 overflow-auto px-4 py-4 bg-gray-100">
      {/* Tabla de asignaciones */}
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="...">ID</th>
            <th className="...">Materia</th>
            <th className="...">Docente</th>
            <th className="...">Periodo</th>
            <th className="... text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((asignacion) => (
            <tr key={asignacion.id}>
              <td className="...">{asignacion.id}</td>
              <td className="...">{getMateriaNombre(asignacion.materia_id)}</td>
              <td className="...">{getDocenteNombre(asignacion.docente_id)}</td>
              <td className="...">{getPeriodoNombre(asignacion.periodo_id)}</td>
              <td className="... text-center">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => onEdit(asignacion)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:text-red-900 ml-4"
                  onClick={() => onDelete(asignacion.id)}
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

export default AsignacionesTable;
