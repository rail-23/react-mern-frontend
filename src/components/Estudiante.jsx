import React, { useEffect, useState } from 'react';
import { createLicense, getMyLicenses } from '../api/services'; // Importamos los servicios
import { useNavigate } from 'react-router-dom';
import '../css/Estudiante.css';

const Estudiante = () => {
    const [licencias, setLicencias] = useState([]);
    const [newLicencia, setNewLicencia] = useState({
        licenseType: '',
        fullName: '', // Esto puede ser dinámico en el futuro
        subject: '',
        reason: '',
        durationDays: '',
        phoneReference: '',
        licenseDate: new Date().toISOString(),
    });
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState('solicitar'); // Modo de vista: 'solicitar' o 'ver'
    const navigate = useNavigate();

    // Obtener las licencias del usuario al cargar el componente
    const fetchLicencias = async () => {
        setLoading(true);
        try {
            const response = await getMyLicenses(); // Llamada al servicio para obtener licencias
            setLicencias(response);
        } catch (error) {
            console.error('Error al obtener las licencias:', error);
            if (error.response?.status === 401) {
                handleLogout(); // Redirigir al login si el token no es válido
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLicencias();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLicencia({ ...newLicencia, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createLicense(newLicencia); // Llamada al servicio para crear una licencia
            alert('Licencia solicitada con éxito.');
            fetchLicencias(); // Actualizar la lista de licencias después de crear una nueva
            setNewLicencia({
                licenseType: '',
                fullName: 'Nombre del Estudiante',
                subject: '',
                reason: '',
                durationDays: '',
                phoneReference: '',
                licenseDate: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Error al solicitar la licencia:', error);
            alert('Hubo un error al solicitar la licencia.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="estudiante-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="title">Mis Licencias</h2>
                <button onClick={handleLogout} className="btn danger1">
                    Cerrar Sesión
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setViewMode('solicitar')} className="btn">
                    Solicitar Licencia
                </button>
                <button onClick={() => setViewMode('ver')} className="btn">
                    Ver Licencias
                </button>
            </div>

            {loading && <p>Cargando...</p>}

            {viewMode === 'solicitar' && (
                <form onSubmit={handleFormSubmit} className="form-container">
                    <h3>Solicitar Licencia</h3>
                    <div>
                        <label>Tipo de Licencia:</label>
                        <select
                            name="licenseType"
                            value={newLicencia.licenseType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecciona un tipo</option>
                            <option value="Enfermedad">Enfermedad</option>
                            <option value="Vacaciones">Vacaciones</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>
                    <div>
                        <label>Nombre del Estudiante:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={newLicencia.fullName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Materia Relacionada:</label>
                        <input
                            type="text"
                            name="subject"
                            value={newLicencia.subject}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Motivo:</label>
                        <input
                            type="text"
                            name="reason"
                            value={newLicencia.reason}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Duración (días):</label>
                        <input
                            type="number"
                            name="durationDays"
                            value={newLicencia.durationDays}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Teléfono de Referencia:</label>
                        <input
                            type="text"
                            name="phoneReference"
                            value={newLicencia.phoneReference}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn success">
                        Solicitar Licencia
                    </button>
                </form>
            )}

            {viewMode === 'ver' && (
                <table className="licencias-table">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Motivo</th>
                            <th>Duración</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licencias.map((licencia) => (
                            <tr key={licencia._id}>
                                <td>{licencia.licenseType}</td>
                                <td>{licencia.reason}</td>
                                <td>{licencia.durationDays} días</td>
                                <td>
                                    {licencia.status === 'pending' && 'Pendiente'}
                                    {licencia.status === 'approved' && 'Aprobada'}
                                    {licencia.status === 'rejected' && 'Rechazada'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Estudiante;
