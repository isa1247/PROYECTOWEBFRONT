// src/pages/EstudiantePage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';
import UsuariosTable from '../../components/admin/UsuariosTable';
import Modal from '../../components/modal';
import UsuarioForm from '../../components/forms/UsuarioForm';
import { getApiUrl } from '../../Config';
import { useNavigate } from 'react-router-dom';

interface Usuario {
  id?: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}

function EstudiantePage() {
  const [estudiantes, setEstudiantes] = useState<Usuario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

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

  // Función para cargar datos de estudiantes desde la API
  const fetchEstudiantes = async () => {
    try {
      const response = await axiosInstance.get('/estudiantes');
      console.log('Respuesta de la API:', response.data);

      // Extraer el array de estudiantes
      const usuariosArray = response.data.data.data || [];
      setEstudiantes(usuariosArray);
    } catch (error: any) {
      console.error('Error al cargar los estudiantes:', error);
      if (error.response && error.response.status === 401) {
        // Redirigir al login si el token no es válido
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleCreate = () => {
    setSelectedUsuario(null);
    setIsModalOpen(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Usuario) => {
    try {
      if (data.id) {
        // Actualizar estudiante existente
        await axiosInstance.put(`/usuarios/${data.id}`, {
          ...data,
          rol_id: 3, // Estudiante
        });
      } else {
        // Crear nuevo estudiante
        await axiosInstance.post('/usuarios', {
          ...data,
          rol_id: 3, // Estudiante
        });
      }
      setIsModalOpen(false);
      fetchEstudiantes(); // Actualizar la lista de estudiantes
    } catch (error: any) {
      console.error('Error al guardar el estudiante:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/usuarios/${id}`);
      fetchEstudiantes();
    } catch (error: any) {
      console.error('Error al eliminar el estudiante:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem="Estudiantes" />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <TopBar />

        {/* Encabezado de contenido */}
        <Header title="Estudiantes" />

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
                Lista de Estudiantes
              </h2>
              <div className="ml-auto">
                <button
                  title="Agregar nuevo estudiante"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreate}
                >
                  + Nuevo Estudiante
                </button>
              </div>
            </header>

            {/* Contenido principal */}
            <UsuariosTable
              usuarios={estudiantes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              tipoUsuario="Estudiante"
            />
          </section>
        </main>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUsuario ? 'Editar Estudiante' : 'Nuevo Estudiante'}
      >
        <UsuarioForm
          initialData={selectedUsuario}
          onSubmit={handleSubmit}
          rol_id={3} // Estudiante
        />
      </Modal>
    </div>
  );
}

export default EstudiantePage;
