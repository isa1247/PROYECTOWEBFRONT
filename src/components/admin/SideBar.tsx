// src/components/admin/Sidebar.tsx
import React from 'react';
import { getApiUrl } from '../../Config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeItem: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Configuración de axios con el token de autenticación
  const axiosInstance = axios.create({
    baseURL: getApiUrl(''),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const menuItems = [
    { title: 'Inicio', href: '/admin/dashboard', icon: 'M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z' },
    { title: 'Materias', href: '/admin/materias', icon: 'M4 4h16v2h-16v-2zm0 4h16v2h-16v-2zm0 4h16v2h-16v-2zm0 4h16v2h-16v-2z' },
    { title: 'Docentes', href: '/admin/docentes', icon: 'M12 12c2.67 0 8 1.34 8 4v4h-16v-4c0-2.66 5.33-4 8-4zm0-2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' },
    { title: 'Estudiantes', href: '/admin/estudiantes', icon: 'M12 12c2.67 0 8 1.34 8 4v4h-16v-4c0-2.66 5.33-4 8-4zm0-2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' },
    { title: 'Asignaciones', href: '/admin/asignaciones', icon: 'M4 4h16v2h-16v-2zm0 4h16v2h-16v-2zm0 4h16v2h-16v-2zm0 4h16v2h-16v-2z' },
    { title: 'Periodos', href: '/admin/periodos', icon: 'M4 4h16v2h-16v-2zm0 4h16v2h-16v-2zm0 4h16v2h-16v-2zm0 4h16v2h-16v-2z' },
    // Agrega más elementos según sea necesario
  ];

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/logout');
      if (response.status === 200) {
        // Eliminar el token del almacenamiento local
        localStorage.removeItem('token');
        // Redirigir a la página de inicio de sesión o página principal
        navigate('/login');
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  return (
    <nav
      aria-label="side bar"
      aria-orientation="vertical"
      className="flex-none flex flex-col items-center text-center bg-teal-900 text-gray-400 border-r"
    >
      <div className="h-16 flex items-center w-full">
        <img
          className="h-6 w-6 mx-auto"
          src="ruta/de/tu/logo.png"
          alt="Logo"
        />
      </div>

      <ul>
        {menuItems.map((item) => (
          <li key={item.title}>
            <a
              title={item.title}
              href={item.href}
              className={`h-16 px-6 flex items-center w-full ${
                activeItem === item.href ? 'text-white bg-teal-700' : 'hover:text-white'
              }`}
            >
              <i className="mx-auto">
                {/* Icono de {item.title} */}
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d={item.icon} />
                </svg>
              </i>
            </a>
          </li>
        ))}
        <li>
          <button
            title="Logout"
            onClick={handleLogout}
            className="h-16 px-6 flex items-center hover:text-white w-full"
          >
            <i className="mx-auto">
              {/* Icono de logout */}
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M10 9v-6h-8v18h8v-6h2v8h-12v-20h12v8h-2zm4.707 1.707l-1.414-1.414 4.293-4.293h-11.586v-2h11.586l-4.293-4.293 1.414-1.414 7.707 7.707-7.707 7.707z" />
              </svg>
            </i>
          </button>
        </li>
      </ul>

      <div className="mt-auto h-16 flex items-center w-full">
        <img
          style={{ filter: 'invert(85%)' }}
          className="h-8 w-10 mx-auto"
          src="ruta/de/otro/logo.png"
          alt="Logo"
        />
      </div>
    </nav>
  );
};

export default Sidebar;