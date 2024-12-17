// src/components/forms/MateriaForm.tsx
import React, { useState } from 'react';

interface Materia {
  id: number;
  nombre: string;
  nivel: string;
  descripcion: string;
}

interface MateriaFormProps {
  initialData?: Materia; // Si es edición, puedes pasar los datos iniciales
  onSubmit: (data: Materia) => void;
}

const MateriaForm: React.FC<MateriaFormProps> = ({ initialData, onSubmit }) => {
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [nivel, setNivel] = useState(initialData?.nivel || '');
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar y enviar los datos
    const data: Materia = {
      id: initialData?.id || 0, // O generar un nuevo ID si es necesario
      nombre,
      nivel,
      descripcion,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <div>
        <label>Nivel</label>
        <input
          type="text"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <div>
        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default MateriaForm;
