import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';

const Index: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-6">Bienvenido al Aula Virtual</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Esta es una plataforma de aula virtual donde puedes gestionar tus cursos, tareas, calificaciones y más. Navega a través de las diferentes secciones para comenzar.
        </p>
        <div className="flex space-x-4">
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Cursos
          </Link>
          <Link to="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Tareas
          </Link>
          <Link to="/" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Calificaciones
          </Link>
          <Link to="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Perfil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;