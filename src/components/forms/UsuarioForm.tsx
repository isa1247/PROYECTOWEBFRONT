// src/components/forms/UsuarioForm.tsx
import React, { useState } from 'react';

interface Usuario {
  id?: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}

interface UsuarioFormProps {
  initialData?: Usuario;
  onSubmit: (data: Usuario) => void;
  rol_id: number; // 2 para Docente, 3 para Estudiante
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({
  initialData,
  onSubmit,
  rol_id,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar y enviar los datos
    const data: Usuario = {
      id: initialData?.id,
      name,
      email,
      password: password || undefined,
      password_confirmation: passwordConfirmation || undefined,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        />
      </div>
      {!initialData && (
        <>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              required
            />
          </div>
          <div>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              required
            />
          </div>
        </>
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default UsuarioForm;
