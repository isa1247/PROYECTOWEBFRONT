import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../Config'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const navigate = useNavigate();

    const validateName = (name: string) => {
        if (!name) {
            return 'El nombre es obligatorio.';
        }
        return '';
    };

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !emailPattern.test(email)) {
            return 'Por favor, ingresa un email válido.';
        }
        return '';
    };

    const validatePassword = (password: string) => {
        if (!password) {
            return 'La contraseña es obligatoria.';
        }
        return '';
    };

    const validatePasswordConfirmation = (password: string, passwordConfirmation: string) => {
        if (password !== passwordConfirmation) {
            return 'Las contraseñas no coinciden.';
        }
        return '';
    };

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            name: validateName(value),
        }));
    };

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: validateEmail(value),
        }));
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: validatePassword(value),
        }));
    };

    const handlePasswordConfirmationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordConfirmation(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            passwordConfirmation: validatePasswordConfirmation(password, value),
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const isValid = !validateName(name) && !validateEmail(email) && !validatePassword(password) && !validatePasswordConfirmation(password, passwordConfirmation);
        if (isValid) {
            try {
                const response = await axios.post(getApiUrl('register'), {
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                });

                // Asumiendo que el backend devuelve un token al registrarse exitosamente
                const { token } = response.data;

                // Guardar el token en el localStorage
                localStorage.setItem('token', token);

                //notificacion de exito con sweetalert2
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Tu cuenta ha sido creada con éxito.',
                    timer: 2000,
                    toast: true,
                    showConfirmButton: false,
                }).then(() => {
                    navigate('/login');
                });
                

            } catch (error: any) {
                //notificacion con sweetalert2
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error durante el registro. Por favor, intenta de nuevo.',
                    timer: 2000,
                    toast: true,
                    showConfirmButton: false,
                });


                if (error.response && error.response.data) {
                    // Manejar errores de validación del backend
                    const backendErrors = error.response.data.errors || {};
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        name: backendErrors.name ? backendErrors.name[0] : '',
                        email: backendErrors.email ? backendErrors.email[0] : '',
                        password: backendErrors.password ? backendErrors.password[0] : '',
                        passwordConfirmation: backendErrors.password_confirmation ? backendErrors.password_confirmation[0] : '',
                    }));
                } else {
                    // Manejar otros errores
                    alert('Ocurrió un error durante el registro. Por favor, intenta de nuevo.');
                }
            }
        }
    };

    return (
        <div>
            <br />
            <br />
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear una Cuenta</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Ingresa tu nombre"
                                value={name}
                                onInput={handleNameInput}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Ingresa tu email"
                                value={email}
                                onInput={handleEmailInput}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onInput={handlePasswordInput}
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="passwordConfirmation" className="block text-gray-700 font-semibold mb-2">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="passwordConfirmation"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Confirma tu contraseña"
                                value={passwordConfirmation}
                                onInput={handlePasswordConfirmationInput}
                                required
                            />
                            {errors.passwordConfirmation && <p className="text-red-500 text-sm mt-2">{errors.passwordConfirmation}</p>}
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Registrarse</button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">¿Ya tienes una cuenta? <a href="/login" className="text-blue-500 font-semibold">Inicia Sesión</a></p>
                </div>
            </div>
        </div>

    );
};

export default Register;