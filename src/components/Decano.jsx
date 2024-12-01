import React, { useEffect, useState } from 'react';
import { approveLicense, rejectLicense, getPendingLicenses } from '../api/services'; // Importamos servicios
import { useNavigate } from 'react-router-dom';
import '../css/Decano.css';

const Decano = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Obtener las solicitudes pendientes
    const fetchSolicitudes = async () => {
        setLoading(true);
        try {
            const response = await getPendingLicenses();
            setSolicitudes(response);
        } catch (error) {
            console.error('Error al obtener las solicitudes:', error);
        } finally {
            setLoading(false);
        }
    };

    // Aprobar una licencia
    const handleApprove = async (id) => {
        setLoading(true);
        try {
            await approveLicense(id);
            alert('Licencia aprobada con éxito.');
            fetchSolicitudes();
        } catch (error) {
            console.error('Error al aprobar la licencia:', error);
            alert('Hubo un error al aprobar la licencia.');
        } finally {
            setLoading(false);
        }
    };

    // Rechazar una licencia
    const handleReject = async (id) => {
        setLoading(true);
        try {
            await rejectLicense(id);
            alert('Licencia rechazada.');
            fetchSolicitudes();
        } catch (error) {
            console.error('Error al rechazar la licencia:', error);
            alert('Hubo un error al rechazar la licencia.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolicitudes();
    }, []);

    // Cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="title">Solicitudes de Licencia</h2>
                <button onClick={handleLogout} className="btn danger">
                    Cerrar Sesión
                </button>
            </div>

            {loading && <p>Cargando...</p>}

            {!loading && solicitudes.length === 0 && <p>No hay solicitudes pendientes.</p>}

            {solicitudes.length > 0 && (
                <table className="solicitudes-table">
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Motivo</th>
                            <th>Duración</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.map((solicitud) => (
                            <tr key={solicitud._id}>
                                <td>{solicitud.fullName}</td>
                                <td>{solicitud.reason}</td>
                                <td>{solicitud.durationDays} días</td>
                                <td>{new Date(solicitud.licenseDate).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        onClick={() => handleApprove(solicitud._id)}
                                        className="btn success"
                                    >
                                        Aprobar
                                    </button>
                                    <button
                                        onClick={() => handleReject(solicitud._id)}
                                        className="btn danger"
                                    >
                                        Rechazar
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

export default Decano;
