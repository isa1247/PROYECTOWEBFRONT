// src/components/forms/AsignacionForm.tsx
import React, { useState } from 'react';

interface Asignacion {
  id?: number;
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

interface AsignacionFormProps {
  initialData?: Asignacion;
  onSubmit: (data: Asignacion) => void;
  materias: Materia[];
  docentes: Docente[];
  periodos: Periodo[];
}

const AsignacionForm: React.FC<AsignacionFormProps> = ({
  initialData,
  onSubmit,
  materias,
  docentes,
  periodos,
}) => {
  const [materiaId, setMateriaId] = useState(initialData?.materia_id || '');
  const [docenteId, setDocenteId] = useState(initialData?.docente_id || '');
  const [periodoId, setPeriodoId] = useState(initialData?.periodo_id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Asignacion = {
      id: initialData?.id,
      materia_id: Number(materiaId),
      docente_id: Number(docenteId),
      periodo_id: Number(periodoId),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Materia</label>
        <select
          value={materiaId}
          onChange={(e) => setMateriaId(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        >
          <option value="">Seleccione una materia</option>
          {materias.map((materia) => (
            <option key={materia.id} value={materia.id}>
              {materia.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Docente</label>
        <select
          value={docenteId}
          onChange={(e) => setDocenteId(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        >
          <option value="">Seleccione un docente</option>
          {docentes.map((docente) => (
            <option key={docente.id} value={docente.id}>
              {docente.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Periodo</label>
        <select
          value={periodoId}
          onChange={(e) => setPeriodoId(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        >
          <option value="">Seleccione un periodo</option>
          {periodos.map((periodo) => (
            <option key={periodo.id} value={periodo.id}>
              {periodo.nombre}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default AsignacionForm;
