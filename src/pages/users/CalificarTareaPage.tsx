import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../Config';

function CalificarTareaPage() {
  const { id } = useParams(); // ID de la tarea
  const [entregas, setEntregas] = useState([]); // Lista de entregas
  const [notas, setNotas] = useState({}); // Estado para almacenar las notas
  const [editable, setEditable] = useState({}); // Controla qué inputs son editables
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: getApiUrl(''),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchEntregas = async () => {
    try {
      const response = await axiosInstance.get(`/tarea/${id}/entregas`);
      setEntregas(response.data);

      // Inicializar estados
      const initialNotas = response.data.reduce((acc, entrega) => {
        if (entrega.calificacion !== null) acc[entrega.id] = entrega.calificacion;
        return acc;
      }, {});

      const initialEditable = response.data.reduce((acc, entrega) => {
        acc[entrega.id] = entrega.calificacion === null; // Editable si no tiene calificación
        return acc;
      }, {});

      setNotas(initialNotas);
      setEditable(initialEditable);
    } catch (error) {
      console.error('No hay entregas:', error);
      Swal.fire('Info', 'No hay entregas', 'info');
    }
  };

  useEffect(() => {
    fetchEntregas();
  }, [id]);

  const handleNotaChange = (entregaId, nota) => {
    setNotas((prevNotas) => ({ ...prevNotas, [entregaId]: nota }));
  };

  const handleEditarNota = (entregaId) => {
    setEditable((prevEditable) => ({ ...prevEditable, [entregaId]: true }));
  };

  const handleGuardarNotas = async () => {
    try {
      const payload = Object.entries(notas).map(([entregaId, calificacion]) => ({
        id: entregaId,
        calificacion: parseFloat(calificacion),
      }));

      await axiosInstance.put(`/entrega/calificar/${id}`, { calificaciones: payload });
      Swal.fire('Éxito', 'Las notas fueron guardadas exitosamente', 'success');
      fetchEntregas(); // Refrescar entregas tras guardar notas
    } catch (error) {
      console.error('Error al guardar las calificaciones:', error);
      Swal.fire('Error', 'No se pudieron guardar las notas', 'error');
    }
  };

  const handleDownload = async (archivo) => {
    try {
      const response = await axiosInstance.get(`/entrega/descargar/${archivo.replace('entregas/', '')}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', archivo.replace('entregas/', ''));
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      Swal.fire('Error', 'No se pudo descargar el archivo', 'error');
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="flex justify-center bg-gray-100 min-h-screen p-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            Calificar Entregas
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Estudiante</th>
                  <th className="border border-gray-300 px-4 py-2">Archivo</th>
                  <th className="border border-gray-300 px-4 py-2">Nota</th>
                </tr>
              </thead>
              <tbody>
                {entregas.length > 0 ? (
                  entregas.map((entrega) => (
                    <tr key={entrega.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {entrega.estudiante.name || 'Sin nombre'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {entrega.archivo ? (
                          <button
                            onClick={() => handleDownload(entrega.archivo)}
                            className="text-blue-500 underline"
                          >
                            Ver Archivo
                          </button>
                        ) : (
                          <span className="text-red-500">No ha subido tarea</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {editable[entrega.id] ? (
                          <div className="flex items-center justify-center space-x-2">
                            <input
                              type="number"
                              min="0"
                              max="20"
                              step="0.5"
                              value={notas[entrega.id] || ''}
                              onChange={(e) =>
                                handleNotaChange(entrega.id, e.target.value)
                              }
                              className="border rounded px-2 py-1 w-20 text-center"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <input
                              type="number"
                              value={notas[entrega.id] || ''}
                              disabled
                              className="border rounded px-2 py-1 w-20 text-center bg-gray-100"
                            />
                            <button
                              onClick={() => handleEditarNota(entrega.id)}
                              className="text-blue-500 underline"
                            >
                              Editar
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      No hay entregas disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleGuardarNotas}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded focus:outline-none"
            >
              Guardar Notas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalificarTareaPage;