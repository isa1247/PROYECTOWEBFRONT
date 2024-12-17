// src/pages/admin/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';
import Stats from '../../components/admin/StatsComponent';
import UpdatesList from '../../components/admin/UpdatesList';
import MateriasTable from '../../components/admin/MateriasTable';
import { getApiUrl } from '../../Config';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [materias, setMaterias] = useState([]);
  const [docentesCount, setDocentesCount] = useState(0);
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();

  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  // Configuración de axios con el token de autenticación
  const axiosInstance = axios.create({
    baseURL: getApiUrl(''),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // Función para cargar datos de materias desde la API
  const fetchMaterias = async () => {
    try {
      const response = await axiosInstance.get('/materias');
      // Aquí ajustamos el estado para obtener el array de materias
      setMaterias(response.data.data);
    } catch (error) {
      console.error('Error al cargar las materias:', error);
      // Manejo adicional de errores, por ejemplo, redirigir al login si hay un error de autenticación
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

    // Función para cargar el conteo de docentes desde la API
    const fetchDocentesCount = async () => {
      try {
        const response = await axiosInstance.get('/docentes');
        
        setDocentesCount(response.data.length);
      } catch (error) {
        console.error('Error al cargar el conteo de docentes:', error);
      }
    };

    // Función para cargar las últimas actualizaciones desde la API
    const fetchUpdates = async () => {
      try {
        const response = await axiosInstance.get('/updates');
        setUpdates(response.data);
      } catch (error) {
        // console.error('Error al cargar las actualizaciones:', error);
      }
    };

    useEffect(() => {
      // Llamamos a las funciones para cargar los datos cuando el componente se monta
      fetchMaterias();
      fetchDocentesCount();
      // fetchUpdates();
    }, []);

    return (
      <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
        {/* Menú lateral */}
        <Sidebar activeItem={'Inicio'} />

        <div className="flex-1 flex flex-col">
          {/* Barra superior */}
          <TopBar />

          {/* Encabezado de contenido */}
          <Header title="Panel de Administración" />

          {/* Contenido principal */}
          <main className="flex-grow flex min-h-0 border-t">
            {/* Sección lateral actualizada */}
            <UpdatesList updates={updates} />

            {/* Sección de contenido principal */}
            <section
              aria-label="main content"
              className="flex min-h-0 flex-col flex-auto border-l"
            >
              {/* Navegación de contenido */}
              <Stats materiasCount={materias.length} docentesCount={docentesCount} />

              {/* Encabezado de la sección principal */}
              <header className="bg-white border-t flex items-center py-1 px-4">
                <h2 id="content-caption" className="font-semibold">
                  Materias disponibles
                </h2>
                <div className="ml-auto">
                  <button
                    title="Agregar nueva materia"
                    className="border rounded-md px-3 py-2 leading-none"
                  >
                    Nueva Materia
                  </button>
                </div>
              </header>

              {/* Contenido principal */}
              <MateriasTable materias={materias} />
            </section>
          </main>
        </div>
      </div>
    );
  }

  export default Dashboard;
