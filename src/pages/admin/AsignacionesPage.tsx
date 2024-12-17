// src/pages/AsignacionesPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';
import AsignacionesTable from '../../components/admin/AsignacionesTable';
import Modal from '../../components/modal';
import AsignacionForm from '../../components/forms/AsignacionForm'; // Asegúrate de tener este formulario
import { getApiUrl } from '../../Config';
import { useNavigate } from 'react-router-dom';

interface Asignacion {
  id: number;
  materia_id: number;
  docente_id: number;
  periodo_id: number;
}

interface Materia {
  id: number;
  nombre: string;
}

interface Docente {
  id: number;
  name: string;
}

interface Periodo {
  id: number;
  nombre: string;
}

function AsignacionesPage() {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsignacion, setSelectedAsignacion] = useState<Asignacion | null>(null);

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

  // Función para cargar datos de asignaciones desde la API
  const fetchAsignaciones = async () => {
    try {
      const response = await axiosInstance.get('/asignaciones');
      console.log('Respuesta de asignaciones:', response.data);
      // Extraer el array de asignaciones
      const asignacionesArray = response.data.data || [];
      setAsignaciones(asignacionesArray);
    } catch (error: any) {
      console.error('Error al cargar las asignaciones:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  // Función para cargar datos de materias
  const fetchMaterias = async () => {
    try {
      const response = await axiosInstance.get('/materias');
      const materiasArray = response.data.data || [];
      setMaterias(materiasArray);
    } catch (error: any) {
      console.error('Error al cargar las materias:', error);
    }
  };

  // Función para cargar datos de docentes
  const fetchDocentes = async () => {
    try {
      const response = await axiosInstance.get('/docentes');
      const docentesArray = response.data.data.data || [];
      setDocentes(docentesArray);
    } catch (error: any) {
      console.error('Error al cargar los docentes:', error);
    }
  };

  // Función para cargar datos de periodos
  const fetchPeriodos = async () => {
    try {
      const response = await axiosInstance.get('/periodos');
      const periodosArray = response.data.data || [];
      setPeriodos(periodosArray);
    } catch (error: any) {
      console.error('Error al cargar los periodos:', error);
    }
  };

  useEffect(() => {
    fetchAsignaciones();
    fetchMaterias();
    fetchDocentes();
    fetchPeriodos();
  }, []);

  const handleCreate = () => {
    setSelectedAsignacion(null);
    setIsModalOpen(true);
  };

  const handleEdit = (asignacion: Asignacion) => {
    setSelectedAsignacion(asignacion);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Asignacion) => {
    try {
      if (data.id) {
        // Actualizar asignación existente
        await axiosInstance.put(`/asignaciones/${data.id}`, data);
      } else {
        // Crear nueva asignación
        await axiosInstance.post('/asignaciones', data);
      }
      setIsModalOpen(false);
      fetchAsignaciones(); // Actualizar la lista de asignaciones
    } catch (error: any) {
      console.error('Error al guardar la asignación:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/asignaciones/${id}`);
      fetchAsignaciones();
    } catch (error: any) {
      console.error('Error al eliminar la asignación:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  // Función para obtener el nombre de la materia dado su ID
  const getMateriaNombre = (id: number) => {
    const materia = materias.find((m) => m.id === id);
    return materia ? materia.nombre : 'Desconocido';
  };

  // Función para obtener el nombre del docente dado su ID
  const getDocenteNombre = (id: number) => {
    const docente = docentes.find((d) => d.id === id);
    return docente ? docente.name : 'Desconocido';
  };

  // Función para obtener el nombre del periodo dado su ID
  const getPeriodoNombre = (id: number) => {
    const periodo = periodos.find((p) => p.id === id);
    return periodo ? periodo.nombre : 'Desconocido';
  };

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem="Asignaciones" />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <TopBar />

        {/* Encabezado de contenido */}
        <Header title="Asignaciones" />

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
                Lista de Asignaciones
              </h2>
              <div className="ml-auto">
                <button
                  title="Agregar nueva asignación"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreate}
                >
                  + Nueva Asignación
                </button>
              </div>
            </header>

            {/* Contenido principal */}
            <AsignacionesTable
              asignaciones={asignaciones}
              getMateriaNombre={getMateriaNombre}
              getDocenteNombre={getDocenteNombre}
              getPeriodoNombre={getPeriodoNombre}
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
        title={selectedAsignacion ? 'Editar Asignación' : 'Nueva Asignación'}
      >
        <AsignacionForm
          initialData={selectedAsignacion}
          onSubmit={handleSubmit}
          materias={materias}
          docentes={docentes}
          periodos={periodos}
        />
      </Modal>
    </div>
  );
}

export default AsignacionesPage;
