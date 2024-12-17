// src/components/admin/TopBar.tsx
import React, { useState } from 'react';
import Modal from '../../components/modal'; // Ajusta la ruta si es necesario
import MateriaForm from '../forms/MateriaForm';
import UsuarioForm from '../forms/UsuarioForm';
import axios from 'axios';
import { getApiUrl } from '../../Config';
import Swal from 'sweetalert2';

function TopBar() {
  // Estados para manejar el modal y la opción seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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

  // Estado para manejar el despliegue del menú
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Función para abrir el modal con la opción seleccionada
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsModalOpen(true);
    setDropdownOpen(false); // Cerrar el menú desplegable
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOption(null);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (data: any) => {
    try {
      let endpoint = '';
      let requestData = data;

      switch (selectedOption) {
        case 'Materia':
          endpoint = '/materias';
          break;
        case 'Docente':
          endpoint = '/usuarios';
          requestData = { ...data, rol: 'docente' };
          break;
        case 'Estudiante':
          endpoint = '/usuarios';
          requestData = { ...data, rol: 'estudiante' };
          break;
        default:
          return;
      }

      // Enviar la solicitud al backend
      await axiosInstance.post(endpoint, requestData);

      
      // Mostrar notificación de éxito con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'La operación se completó correctamente',
      });

      // Cerrar el modal
      closeModal();

      // Opcional: Actualizar los datos en el componente padre si es necesario
    } catch (error) {
      console.error('Error al agregar:', error);
      // Mostrar notificación de error (opcional)
      // ...
    }
  };

  return (
    <nav
      aria-label="top bar"
      className="flex-none flex justify-between bg-white h-16"
    >
      {/* Barra superior izquierda */}
      <ul aria-label="top bar left" className="flex">
        {/* Botón agregar */}
        <li className="relative">
          <button
            aria-haspopup="listbox"
            className="flex items-center h-full px-4 text-sm"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <i>
              <svg
                className="fill-current w-3 h-3 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z" />
              </svg>
            </i>
            <span className="ml-2">Agregar</span>
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 p-1 bg-white border rounded-md shadow-lg">
              <ul
                role="listbox"
                className="outline-none py-2 w-40 leading-relaxed"
              >
                <li
                  role="option"
                  className="px-6 py-1 my-1 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleOptionSelect('Materia')}
                >
                  Materia
                </li>
                <li
                  role="option"
                  className="px-6 py-1 my-1 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleOptionSelect('Docente')}
                >
                  Docente
                </li>
                <li
                  role="option"
                  className="px-6 py-1 my-1 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleOptionSelect('Estudiante')}
                >
                  Estudiante
                </li>
                {/* Agrega más opciones si es necesario */}
              </ul>
            </div>
          )}
        </li>
      </ul>

      {/* Barra superior derecha */}
      {/* ... (resto del código de la barra superior derecha) */}

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            selectedOption === 'Materia'
              ? 'Nueva Materia'
              : selectedOption === 'Docente'
              ? 'Nuevo Docente'
              : 'Nuevo Estudiante'
          }
        >
          {selectedOption === 'Materia' && (
            <MateriaForm initialData={null} onSubmit={handleSubmit} />
          )}
          {selectedOption === 'Docente' && (
            <UsuarioForm initialData={null} onSubmit={handleSubmit} />
          )}
          {selectedOption === 'Estudiante' && (
            <UsuarioForm initialData={null} onSubmit={handleSubmit} />
          )}
        </Modal>
      )}
    </nav>
  );
}

export default TopBar;
