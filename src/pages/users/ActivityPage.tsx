import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { getApiUrl } from '../../Config';

function CrearTareaPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const materiaId = localStorage.getItem('materiaId'); // Obtener el ID de la materia desde localStorage

    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha_entrega: '',
        archivo: null,
    });
    const [errors, setErrors] = useState({});

    const axiosInstance = axios.create({
        baseURL: getApiUrl(''),
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            archivo: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('titulo', formData.titulo);
        form.append('descripcion', formData.descripcion);
        form.append('fecha_entrega', formData.fecha_entrega);
        form.append('curso_id', materiaId); // Usar el ID de la materia desde localStorage
        if (formData.archivo) {
            form.append('archivo', formData.archivo);
        }

        try {
            await axiosInstance.post('/tareas', form);
            navigate('/tareas'); // Redirige a la lista de tareas después de crearla
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error al crear la tarea:', error);
            }
        }
    };

    return (
        <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
            <div className="flex-1 flex flex-col">
                <Navbar />
                <br />
                <br />
                <main className="flex-grow flex flex-col min-h-0 border-t">
                    <section aria-label="main content" className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    value={formData.titulo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.titulo && <p className="text-red-600 text-sm">{errors.titulo}</p>}
                            </div>

                            <div>
                                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <textarea
                                    name="descripcion"
                                    id="descripcion"
                                    rows="4"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                ></textarea>
                                {errors.descripcion && <p className="text-red-600 text-sm">{errors.descripcion}</p>}
                            </div>

                            <div>
                                <label htmlFor="fecha_entrega" className="block text-sm font-medium text-gray-700">
                                    Fecha de Entrega
                                </label>
                                <input
                                    type="date"
                                    name="fecha_entrega"
                                    id="fecha_entrega"
                                    value={formData.fecha_entrega}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.fecha_entrega && (
                                    <p className="text-red-600 text-sm">{errors.fecha_entrega}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="archivo" className="block text-sm font-medium text-gray-700">
                                    Archivo (opcional)
                                </label>
                                <input
                                    type="file"
                                    name="archivo"
                                    id="archivo"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full text-sm text-gray-500"
                                />
                                {errors.archivo && <p className="text-red-600 text-sm">{errors.archivo}</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
                                >
                                    Crear Tarea
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default CrearTareaPage;
