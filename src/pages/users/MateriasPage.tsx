import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl } from '../../Config';
import Navbar from '../../components/navbar';


function MateriasPage() {
  const navigate = useNavigate();
  const [materias, setMaterias] = useState([]);
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: getApiUrl(''),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchMaterias = async () => {
    try {
      const response = await axiosInstance.get('/materias');
      setMaterias(response.data.data || response.data);
    } catch (error) {
      console.error('Error al cargar las materias:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleVerMas = (materiaId) => {
    localStorage.setItem('materiaId', materiaId); // Guardar el ID de la materia
    navigate('/tareas'); // Redirigir a la página de tareas
  };

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <br />
        <br />
        <main className="flex-grow flex flex-col min-h-0 border-t">
          <section aria-label="main content" className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Lista de Materias</h2>
            {materias.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {materias.map((materia) => (
                  <div
                    key={materia.id}
                    className="border rounded-lg p-4 bg-gray-100 shadow-md"
                  >
                    <h3 className="text-lg font-bold">{materia.nombre}</h3>
                    <p className="text-sm text-gray-600"><strong>Nivel: </strong>{materia.nivel}</p>
                    <p className="text-sm text-gray-600"><strong>Descripcion: </strong>{materia.descripcion}</p>

                    <button
                      className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                      onClick={() => handleVerMas(materia.id)}
                    >
                      Ver más
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No hay materias disponibles.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default MateriasPage;
