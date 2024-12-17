import React from 'react';

const Navbar: React.FC = () => {
  const rol = localStorage.getItem('rol'); // Obtener el rol desde localStorage

  //funcion de logut elimina todo lo que haya en el localstorage
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };


  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          {/* Logo */}
          <div className="flex flex-1 items-stretch justify-start">
            <a className="flex flex-shrink-0 items-center" href="/">
              <img
                className="block h-12 w-auto"
                src="https://www.svgrepo.com/show/501888/donut.svg"
                alt="Logo"
              />
            </a>
          </div>

          {/* Opciones según rol */}
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
            {rol ? (
              <>
                {/* Opciones cuando hay rol */}
                <a
                  className="text-gray-700 hover:text-indigo-700 text-sm font-medium"
                  href="/"
                >
                  Inicio
                </a>
                <a
                  className="text-gray-700 hover:text-indigo-700 text-sm font-medium"
                  href="/materias"
                >
                  Cursos
                </a>
                <a
                  className="text-gray-700 hover:text-indigo-700 text-sm font-medium cursor-pointer"
                  onClick={logout}
                >
                  Cerrar sesion
                </a>
              </>
            ) : (
              <>
                {/* Opciones predeterminadas si no hay rol */}
                <a
                  className="text-gray-700 hover:text-indigo-700 text-sm font-medium"
                  href="/login"
                >
                  Iniciar Sesion
                </a>
                <a
                  className="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm"
                  href="/register"
                >
                  Registrarse
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
