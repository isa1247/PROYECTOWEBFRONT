// src/components/forms/PeriodoForm.tsx
import React, { useState } from 'react';

interface Periodo {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
}

interface PeriodoFormProps {
  initialData?: Periodo;
  onSubmit: (data: Periodo) => void;
}

const PeriodoForm: React.FC<PeriodoFormProps> = ({ initialData, onSubmit }) => {
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [fechaInicio, setFechaInicio] = useState(
    initialData?.fechaInicio || ''
  );
  const [fechaFin, setFechaFin] = useState(initialData?.fechaFin || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar y enviar los datos
    const data: Periodo = {
      id: initialData?.id || 0,
      nombre,
      fechaInicio,
      fechaFin,
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
        <label>Fecha Inicio</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <div>
        <label>Fecha Fin</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default PeriodoForm;
