import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../Config';
import Navbar from '../../components/navbar';

function TareasPage() {
  const navigate = useNavigate();
  const [tareas, setTareas] = useState([]);
  const [rol, setRol] = useState(null);
  const token = localStorage.getItem('token');
  const materiaId = localStorage.getItem('materiaId'); // Obtener el ID de la materia

  const axiosInstance = axios.create({
    baseURL: getApiUrl(''),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchTareas = async () => {
    try {
      const response = await axiosInstance.get(`/tareas?materiaId=${materiaId}`);
      setTareas(response.data.data || response.data);
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleAgregarTarea = () => {
    navigate('/tareas/agregar'); // Redirige a una página para agregar tareas
  };

  //Funcion para ir a ver las calificaciones
  const handleCalificaciones = () => {
    navigate('/calificaciones');
  };



  const handleVistaPrevia = (tareaId) => {
    // Redirige a la página de detalle de la tarea pasando el ID de la tarea
    navigate(`/tareas/${tareaId}`);
  };

  const handleAgregarEntrega = (tareaId) => {
    // Redirige a la página de agregar entrega pasando el ID de la tarea
    navigate(`/tareas/${tareaId}`);
  };

  useEffect(() => {
    const userRol = localStorage.getItem('rol'); // Obtener el rol del usuario
    setRol(userRol);

    if (!materiaId) {
      console.error('No se encontró el ID de la materia.');
      navigate('/materias'); // Redirigir a la página de materias si no hay ID
    } else {
      fetchTareas();
    }
  }, [materiaId]);

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">

      <div className="flex-1 flex flex-col">
        <Navbar />
        <br />
        <br />
        <main className="flex-grow flex flex-col min-h-0 border-t">

          <section aria-label="main content" className="p-6">

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleCalificaciones}
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
              >
                Calificaciones
              </button>
              <h2 className="text-2xl font-semibold">Lista de Tareas</h2>
              {rol === 'profesor' && (
                <button
                  onClick={handleAgregarTarea}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                >
                  Agregar Tarea
                </button>
              )}
            </div>

            {tareas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tareas.map((tarea) => (
                  <div
                    key={tarea.id}
                    data_id={tarea.id}  // Se agrega el atributo data_id
                    className="border rounded-lg p-4 bg-gray-100 shadow-md"
                  >
                    <h3 className="text-lg font-bold">{tarea.titulo}</h3>
                    <p className="mt-2 text-sm text-gray-600"><strong>Descripcion de la tarea: </strong>{tarea.descripcion}</p>
                   
                    <p className="mt-1 text-sm">
                      <strong>Fecha de entrega:</strong> {tarea.fecha_entrega}
                    </p>
                    {rol === 'profesor' ? (
                      <button
                        onClick={() => handleVistaPrevia(tarea.id)}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
                      >
                        Vista Previa
                      </button>
                    ) : rol === 'estudiante' ? (
                      <button
                        onClick={() => handleAgregarEntrega(tarea.id)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                      >
                        Agregar Entrega
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No hay tareas disponibles.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default TareasPage;
