import axios from 'axios';

// Crear una instancia de Axios con la configuración base
const axiosInstance = axios.create({
  baseURL: 'https://react-mern-express.onrender.com', // URL del backend en Render
  headers: {
    'Content-Type': 'application/json', // Asegura que los datos sean enviados como JSON
  },
});


// Interceptor para incluir el token de autenticación en cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener el token de localStorage (si existe)
    const token = localStorage.getItem('token');
    
    // Si el token está presente, incluirlo en la cabecera 'x-access-token'
    if (token) {
      config.headers['x-access-token'] = token;
    }
    
    return config; // Retornar la configuración para que la solicitud continúe
  },
  (error) => {
    // Manejar errores de solicitud
    return Promise.reject(error);
  }
);

// Manejo de errores global en las respuestas de Axios
axiosInstance.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, retornamos los datos
    return response;
  },
  (error) => {
    // Si hay un error, se maneja aquí (por ejemplo, error de autenticación, etc.)
    if (error.response) {
      // Aquí puedes manejar diferentes tipos de errores (401, 500, etc.)
      console.error('Error en la respuesta:', error.response.data);
    } else if (error.request) {
      console.error('Error en la solicitud:', error.request);
    } else {
      console.error('Error inesperado:', error.message);
    }
    
    // Retornar un error global para poder manejarlo en el componente
    return Promise.reject(error);
  }
);

export default axiosInstance;
