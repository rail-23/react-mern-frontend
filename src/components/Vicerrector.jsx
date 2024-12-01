import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApprovedLicenses, completeLicense } from '../api/services'; // Servicios específicos
import '../css/Vicerrector.css';

const Vicerrector = () => {
    const [licencias, setLicencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Obtener licencias aprobadas
    const fetchAprobadas = async () => {
        setLoading(true);
        try {
            const response = await getApprovedLicenses(); // Servicio para obtener licencias aprobadas
            setLicencias(response);
        } catch (error) {
            console.error('Error al obtener las licencias:', error);
            alert('Hubo un error al cargar las licencias aprobadas.');
        } finally {
            setLoading(false);
        }
    };

    // Completar una licencia
    const handleComplete = async (id) => {
        setLoading(true);
        try {
            await completeLicense(id); // Servicio para completar una licencia
            alert('Licencia completada con éxito.');
            fetchAprobadas(); // Actualizar la lista después de completar
        } catch (error) {
            console.error('Error al completar la licencia:', error);
            alert('Hubo un error al completar la licencia.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAprobadas(); // Cargar licencias aprobadas al iniciar el componente
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="vicerrector-container">
            <div className="header">
                <h2 className="title">Licencias Aprobadas</h2>
                <button onClick={handleLogout} className="btn danger">
                    Cerrar Sesión
                </button>
            </div>

            {loading && <p>Cargando...</p>}

            {!loading && licencias.length === 0 && (
                <p>No hay licencias aprobadas para finalizar.</p>
            )}

            {licencias.length > 0 && (
                <table className="licencias-table">
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Tipo</th>
                            <th>Motivo</th>
                            <th>Duración</th>
                            <th>Fecha de Licencia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licencias.map((licencia) => (
                            <tr key={licencia._id}>
                                <td>{licencia.fullName}</td>
                                <td>{licencia.licenseType}</td>
                                <td>{licencia.reason}</td>
                                <td>{licencia.durationDays} días</td>
                                <td>
                                    {new Date(licencia.licenseDate).toLocaleDateString()}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleComplete(licencia._id)}
                                        className="btn success"
                                    >
                                        Finalizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Vicerrector;
