// src/pages/login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getApiUrl } from '../Config';

const MySwal = withReactContent(Swal);

const Login: React.FC = () => {
  const navigate = useNavigate();

  // Estados para los campos de email y contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para manejar la carga
  const [loading, setLoading] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Iniciar la carga
    setLoading(true);

    try {
      // Realizar la solicitud al backend
      const response = await axios.post(
        getApiUrl('login'),
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Obtener el token del backend
      const { token, rol } = response.data;

      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);
      //dependiendo del rol guardar el id como id_estudiante o id_profesor
      if(rol === 'estudiante'){
        localStorage.setItem('id_estudiante', response.data.id);
      }
      if(rol === 'profesor'){
        localStorage.setItem('id_profesor', response.data.id);
      }

      // Mostrar notificación de éxito
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // Redirigir según el rol
      if (rol === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/materias');
      }
    } catch (error: any) {
      // Manejo de errores
      console.error('Error al iniciar sesión:', error);

      // Mostrar notificación de error
      MySwal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Credenciales inválidas',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      // Finalizar la carga
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div className="min-h-screen flex items-center justify-center">
        {/* Login Form */}
        <div className="relative z-10 bg-white p-8 rounded-md shadow-lg">
          <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Correo electrónico
              </label>
              <input
                className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between gap-8">
              <button
                className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Cargando...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-cyan-500 hover:text-cyan-800"
                href="/register"
              >
                ¿No tienes cuenta?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
