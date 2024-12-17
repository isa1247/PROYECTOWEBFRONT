import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../Config';

function DetalleTareaPage() {
  const { id } = useParams();
  const [tarea, setTarea] = useState(null);
  const [entrega, setEntrega] = useState({ comentarios: '', archivo: null });
  const [entregaExistente, setEntregaExistente] = useState(null); // Guardará los datos de la entrega
  const [rol] = useState(localStorage.getItem('rol'));
  const token = localStorage.getItem('token');
  const estudianteId = localStorage.getItem('id_estudiante');
  const [editMode, setEditMode] = useState(false); // Controla el modo de edición

  const axiosInstance = axios.create({
    baseURL: getApiUrl(''),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchTarea();
    if (rol === 'estudiante') {
      verificarEntrega();
    }
  }, [id]);

  const fetchTarea = async () => {
    try {
      const response = await axiosInstance.get(`/tareas/detalle/${id}`);
      setTarea(response.data);
    } catch (error) {
      console.error('Error al obtener la tarea:', error);
    }
  };

  const verificarEntrega = async () => {
    try {
      const entregaResponse = await axiosInstance.get(`/entregas/${id}`);
      // Accede al primer elemento del array
      setEntregaExistente(entregaResponse.data.data[0]);
      console.log('Entrega:', entregaExistente);
    } catch (error) {
      console.error('Error al verificar la entrega:', error);
    }
  };

  const handleFileChange = (e) => {
    setEntrega({ ...entrega, archivo: e.target.files[0] });
  };

  const handleEditEntrega = async () => {
    const formData = new FormData();
    formData.append('comentarios', entregaExistente.comentarios);
    if (entrega.archivo) formData.append('archivo', entrega.archivo);

    try {
      await axiosInstance.put(`/entregas/${entregaExistente.id}`, formData);
      Swal.fire('Éxito', 'Entrega actualizada con éxito', 'success');
      verificarEntrega(); // Refrescar estado
      setEditMode(false); // Salir del modo de edición
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar la entrega', 'error');
    }
  };

  const handleSubmitEntrega = async () => {
    const formData = new FormData();
    formData.append('comentarios', entrega.comentarios);
    formData.append('archivo', entrega.archivo);

    try {
      await axiosInstance.post(`/entregas/${id}`, formData);
      Swal.fire('Éxito', 'Entrega realizada con éxito', 'success');
      verificarEntrega(); // Refrescar estado
    } catch (error) {
      Swal.fire('Error', 'No se pudo realizar la entrega', 'error');
    }
  };

  const handleDeleteEntrega = async () => {
    try {
      await axiosInstance.delete(`/entregas/${entregaExistente.id}`);
      Swal.fire('Éxito', 'Entrega eliminada con éxito', 'success');
      setEntregaExistente(null); // Limpia el estado de la entrega
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar la entrega', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEntrega({ comentarios: '', archivo: null }); // Reinicia inputs
  };

  if (!tarea) {
    return <div className="text-center mt-10 text-lg">Cargando...</div>;
  }

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="flex justify-center bg-gray-100 min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            {rol === 'profesor' ? 'Gestionar Tarea' : 'Detalles de la Tarea'}
          </h2>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">
              {tarea.titulo}
            </h3>
            <p className="text-gray-700 mb-4">{tarea.descripcion}</p>
            <p className="text-gray-600">
              <strong>Fecha de Entrega: </strong>
              {new Date(tarea.fecha_entrega).toLocaleDateString() || 'Sin definir'}
            </p>
          </div>

          {rol === 'estudiante' && (
            entregaExistente ? (
              <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                {entregaExistente.calificacion ? (
                  // Si tiene calificación, deshabilitamos todos los inputs y ocultamos botones
                  <>
                    <h3 className="text-lg font-semibold mb-4">Entrega Calificada</h3>
                    <textarea
                      value={entregaExistente.comentarios}
                      disabled
                      className="w-full h-24 border rounded-lg px-3 py-2 mb-4"
                    />
                    <p className="text-gray-700">
                      <strong>Calificación: </strong>{entregaExistente.calificacion}
                    </p>
                  </>
                ) : (
                  // Si no tiene calificación
                  <>
                    <h3 className="text-lg font-semibold mb-4">Editar o Eliminar Entrega</h3>
                    <textarea
                      value={entregaExistente.comentarios}
                      onChange={(e) =>
                        setEntregaExistente({ ...entregaExistente, comentarios: e.target.value })
                      }
                      disabled={!editMode}
                      className="w-full h-24 border rounded-lg px-3 py-2 mb-4"
                    />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-500 border rounded-lg px-3 py-2 mb-4"
                      accept=".pdf,.docx,.txt"
                      disabled={!editMode}
                    />
                    <div className="flex space-x-4">
                      {editMode ? (
                        <>
                          <button
                            onClick={handleEditEntrega}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                          >
                            Guardar Cambios
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditMode(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                          >
                            Editar
                          </button>
                          <button
                            onClick={handleDeleteEntrega}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Si no existe una entrega, permite crearla
              <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold mb-4">Entrega de Tarea</h3>
                <textarea
                  value={entrega.comentarios}
                  onChange={(e) =>
                    setEntrega({ ...entrega, comentarios: e.target.value })
                  }
                  className="w-full h-24 border rounded-lg px-3 py-2 mb-4"
                  placeholder="Comentarios de entrega..."
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 border rounded-lg px-3 py-2 mb-4"
                  accept=".pdf,.docx,.txt"
                />
                <button
                  onClick={handleSubmitEntrega}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Subir Tarea
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleTareaPage;
