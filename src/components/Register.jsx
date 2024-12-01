import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        rol: 'estudiante'
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
            await axios.post('/auth/register', formData);
            alert('Registro exitoso. Por favor, inicia sesión.');
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro:', error.response?.data || error);
            alert('Error en el registro. Por favor, intenta nuevamente.');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <label>
                Nombre:
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
                Contraseña:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <label>
                Rol:
                <select name="rol" value={formData.rol} onChange={handleChange} required>
                    <option value="estudiante">Estudiante</option>
                    <option value="decano">Decano</option>
                    <option value="vicerrector">Vicerrector</option>
                </select>
            </label>

            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
