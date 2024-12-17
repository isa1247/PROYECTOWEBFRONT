// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import MateriasPage from './pages/admin/MateriasPage';
import AdminPanel from './pages/admin/admin';
import Login from './pages/login';
import DocentesPage from './pages/admin/DocentesPage';
import Navbar from './components/navbar';
import Register from './pages/register';
import Dashboard from './pages/admin/admin';
import AsignacionesPage from './pages/admin/AsignacionesPage';
import EstudiantesPage from './pages/admin/EstudiantePage';
import PeriodosPage from './pages/admin/PeriodosPage';
import MateriasUserPage from './pages/users/MateriasPage';
import TareasPage from './pages/users/MateriaUniquePage';
import DetalleTareaPage from './pages/users/HomeworkPage';
import CrearTareaPage from './pages/users/ActivityPage';
import CalificarTareaPage from './pages/users/CalificarTareaPage';
import Calificaciones from './pages/users/Calificaciones';
import Index from './pages';


function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para Login con Navbar */}
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />

        {/* Ruta para Register con Navbar */}
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />

        {/* Ruta para la página principal redirige a Login */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Index/>
            </>
          }
        />

        {/* Rutas de administración sin Navbar */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/materias" element={<MateriasPage />} />
        <Route path="/admin/docentes" element={<DocentesPage />} />
        <Route path="/admin/asignaciones" element={<AsignacionesPage />} />
        <Route path="/admin/estudiantes" element={<EstudiantesPage />} />
        <Route path="/admin/periodos" element={<PeriodosPage />} />
        <Route path='/materias' element={<MateriasUserPage/>}/>
        <Route path='/tareas' element={<TareasPage/>}/>
        <Route path='/tareas/:id' element={<DetalleTareaPage/>}/>
        <Route path='/tareas/agregar' element={<CrearTareaPage/>}/>
        <Route path="/calificar/:id" element={<CalificarTareaPage />} />
        <Route path="/calificaciones" element={<Calificaciones />} />

        {/* Ruta para manejar rutas no encontradas */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20">
              <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
              <p>La página que buscas no existe.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
