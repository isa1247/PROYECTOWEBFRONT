import React from 'react';

interface Docente {
    id: number;
    nombre: string;
    especialidad: string;
    email: string;
}

interface DocentesTableProps {
    docentes: Docente[];
}

function DocentesTable({ docentes }: DocentesTableProps) {
    return (
        <div className="flex-1 overflow-auto px-4">
            {/* Tabla de docentes */}
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
                            Especialidad
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.map((docente) => (
                        <tr key={docente.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {docente.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {docente.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {docente.especialidad}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {docente.email}
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

export default DocentesTable;