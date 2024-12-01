import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/services';
import { decodeJWT } from '../utils/decodeJWT';
import '../css/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            alert('Inicio de sesión exitoso.');

            // Decodificar el token para obtener el rol del usuario
            const decodedToken = decodeJWT(data.token);
            const userRoles = decodedToken.roles;

            // Redirigir según el rol del usuario
            if (userRoles.includes("estudiante")) {
                navigate('/estudiante'); // Redirige a la página del estudiante
            } else if (userRoles.includes("decano")) {
                navigate('/decano'); // Redirige a la página del decano
            } else if (userRoles.includes("vicerrector")) {
                navigate('/vicerrector'); // Redirige a la página del vicerrector
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            alert('Error en el inicio de sesión. Por favor, intenta nuevamente.');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Contraseña:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default Login;
