import axios from './axios';

// Servicio de registro de usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Servicio de inicio de sesión
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
    }
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};export const createLicense = async (licenseData) => {
  try {
    const response = await axios.post('/licenses/create', licenseData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la licencia:', error.response?.data || error);
    throw error;
  }
};

// Servicio para obtener las licencias del usuario autenticado
export const getMyLicenses = async () => {
  try {
    const response = await axios.get('/licenses/mis-licencias');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las licencias:', error.response?.data || error);
    throw error;
  }
};

// Servicio para obtener las licencias pendientes
export const getPendingLicenses = async () => {
  try {
    const response = await axios.get('/licenses/pendientes');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las licencias pendientes:', error.response?.data || error);
    throw error;
  }
};

// Servicio para aprobar una licencia
export const approveLicense = async (id) => {
  try {
      const response = await axios.put(`/licenses/approve/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error al aprobar la licencia:', error.response?.data || error);
      throw error;
  }
};
export const rejectLicense = async (id) => {
  try {
      const response = await axios.put(`/licenses/reject/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error al rechazar la licencia:', error.response?.data || error);
      throw error;
  }
};
export const getAllLicensesForDecano = async () => {
  try {
      const response = await axios.get('/licenses/todas');
      return response.data;
  } catch (error) {
      console.error('Error al obtener las licencias para el Decano:', error);
      throw error;
  }
};export const getApprovedLicenses = async () => {
  try {
      const response = await axios.get('/licenses/aprobadas'); // Endpoint para licencias aprobadas
      return response.data;
  } catch (error) {
      console.error('Error al obtener licencias aprobadas:', error);
      throw error;
  }
};

// Servicio para completar una licencia
export const completeLicense = async (id) => {
  try {
      const response = await axios.put(`/licenses/complete/${id}`);
      return response.data;
  } catch (error) {
      console.error('Error al completar la licencia:', error);
      throw error;
  }
};