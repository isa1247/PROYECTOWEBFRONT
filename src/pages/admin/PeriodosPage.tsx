// src/pages/PeriodosPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';
import PeriodosTable from '../../components/admin/PeriodosTable';
import Modal from '../../components/modal';
import PeriodoForm from '../../components/forms/PeriodoForm';
import { getApiUrl } from '../../Config';
import { useNavigate } from 'react-router-dom';

interface Periodo {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
}

function PeriodosPage() {
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPeriodo, setSelectedPeriodo] = useState<Periodo | null>(null);

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

  // Función para cargar datos de periodos desde la API
  const fetchPeriodos = async () => {
    try {
      const response = await axiosInstance.get('/periodos');
      console.log('Respuesta de periodos:', response.data);

      // Extraer el array de periodos
      const periodosArray = response.data.data || [];

      // Transformar los datos para que las propiedades coincidan con tu interfaz
      const transformedPeriodos = periodosArray.map((periodo: any) => ({
        id: periodo.id,
        nombre: periodo.nombre,
        fechaInicio: periodo.fecha_inicio,
        fechaFin: periodo.fecha_fin,
      }));

      setPeriodos(transformedPeriodos);
    } catch (error: any) {
      console.error('Error al cargar los periodos:', error);
      if (error.response && error.response.status === 401) {
        // Redirigir al login si el token no es válido
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchPeriodos();
  }, []);

  const handleCreate = () => {
    setSelectedPeriodo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (periodo: Periodo) => {
    setSelectedPeriodo(periodo);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Periodo) => {
    try {
      if (data.id) {
        // Actualizar periodo existente
        await axiosInstance.put(`/periodos/${data.id}`, {
          nombre: data.nombre,
          fecha_inicio: data.fechaInicio,
          fecha_fin: data.fechaFin,
        });
      } else {
        // Crear nuevo periodo
        await axiosInstance.post('/periodos', {
          nombre: data.nombre,
          fecha_inicio: data.fechaInicio,
          fecha_fin: data.fechaFin,
        });
      }
      setIsModalOpen(false);
      fetchPeriodos(); // Actualizar la lista de periodos
    } catch (error: any) {
      console.error('Error al guardar el periodo:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/periodos/${id}`);
      fetchPeriodos(); // Actualizar la lista de periodos
    } catch (error: any) {
      console.error('Error al eliminar el periodo:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem="Periodos" />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <TopBar />

        {/* Encabezado de contenido */}
        <Header title="Periodos" />

        {/* Contenido principal */}
        <main className="flex-grow flex min-h-0 border-t">
          {/* Sección de contenido principal */}
          <section
            aria-label="main content"
            className="flex min-h-0 flex-col flex-auto"
          >
            {/* Encabezado de la sección principal */}
            <header className="bg-white border-b flex items-center py-4 px-4">
              <h2 id="content-caption" className="font-semibold text-xl">
                Lista de Periodos
              </h2>
              <div className="ml-auto">
                <button
                  title="Agregar nuevo periodo"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreate}
                >
                  + Nuevo Periodo
                </button>
              </div>
            </header>

            {/* Contenido principal */}
            <PeriodosTable
              periodos={periodos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </main>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPeriodo ? 'Editar Periodo' : 'Nuevo Periodo'}
      >
        <PeriodoForm initialData={selectedPeriodo} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

export default PeriodosPage;
